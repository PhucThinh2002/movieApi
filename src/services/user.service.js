import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../common/prisma/init.prisma.js";
import { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRED, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRED } from "../common/constant/app.constant.js";
import { BadRequestException, UnauthorizationException } from "../common/helpers/error.helper.js";
import sendMail from "../common/nodemailer/send-mail.nodemailer.js";

const userService = {
  layDanhSachLoaiNguoiDung: async () => {
    return await prisma.nguoiDung.findMany({
      select: { loaiNguoiDung: true },
      distinct: ["loaiNguoiDung"],
    });
  },
  login: async (req) => {
    const { taiKhoan, matKhau } = req.body;

    const userExists = await prisma.nguoiDung.findFirst({
      where: { taiKhoan },
    });
    if (!userExists)
      throw new BadRequestException("Tài khoản chưa tồn tại, vui lòng đăng ký");

    const isPassword = bcrypt.compareSync(matKhau, userExists.matKhau);
    if (!isPassword) throw new BadRequestException("Mật khẩu không chính xác");

    return userService.createTokens(userExists.id);
  },

  refreshToken: async (req) => {
    const refreshToken = req.headers.authorization?.split(" ")[1];
    if (!refreshToken) {
      throw new UnauthorizationException(
        "Vui lòng cung cấp token để tiếp tục sử dụng"
      );
    }

    
    const accessToken = req.headers["x-access-token"];
    if (!accessToken) {
      throw new UnauthorizationException(
        "Vui lòng cung cấp token để tiếp tục sử dụng"
      );
    }

    let decodeRefreshToken, decodeAccessToken;
    try {
      decodeRefreshToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
      decodeAccessToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET, {
        ignoreExpiration: true,
      });
    } catch (error) {
      throw new UnauthorizationException("Token không hợp lệ hoặc đã hết hạn");
    }

    if (decodeRefreshToken.userId !== decodeAccessToken.userId) {
      throw new UnauthorizationException("Cặp token không hợp lệ");
    }

    const userExists = await prisma.nguoiDung.findUnique({
      where: { id: decodeRefreshToken.userId },
    });
    if (!userExists) throw new UnauthorizationException("User không tồn tại");

    return userService.createTokens(userExists.id);
  },

  register: async (req) => {
    console.log("Data nhận được trong Service:", req);
    if (!req) {
      throw new BadRequestException("Dữ liệu đầu vào không hợp lệ!");
    }
    const { taiKhoan, matKhau, email, soDt, maNhom, hoTen } = req;
    const userExists = await prisma.nguoiDung.findFirst({
      where: {
        OR: [{ taiKhoan }, { email }],
      },
    });

    if (userExists) {
      throw new BadRequestException(`Tài khoản đã tồn tại, Vui lòng đăng nhập`);
    }
    const passHash = bcrypt.hashSync(matKhau, 10);
    const userNew = await prisma.nguoiDung.create({
      data: {
        taiKhoan: taiKhoan,
        matKhau: passHash,
        email: email,
        soDt: soDt || null,
        maNhom: maNhom,
        hoTen: hoTen,
      },
    });
    delete userNew.matKhau;
    sendMail(email).catch((err) => console.log("Lỗi gửi email:", err));
    return userNew;
  },

  layDanhSachNguoiDung: async () => {
    return await prisma.nguoiDung.findMany({
      select: {
        id: true,
        taiKhoan: true,
        email: true,
        soDt: true,
        hoTen: true,
      },
    });
  },

  layDanhSachNguoiDungPhanTrang: async (page = 1, pageSize = 20) => {
    const pageInt = parseInt(page) || 1;
    const pageSizeInt = parseInt(pageSize) || 20;

    const skip = (pageInt - 1) * pageSizeInt;

    const users = await prisma.nguoiDung.findMany({
      skip,
      take: pageSizeInt,
      select: {
        id: true,
        taiKhoan: true,
        email: true,
        soDt: true,
        hoTen: true,
        loaiNguoiDung: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const totalUsers = await prisma.nguoiDung.count();

    return {
      currentPage: pageInt,
      pageSize: pageSizeInt,
      totalUsers,
      totalPages: Math.ceil(totalUsers / pageSizeInt),
      users,
    };
  },

  timKiemNguoiDung: async (tuKhoa) => {
    return await prisma.nguoiDung.findMany({
      where: { hoTen: { contains: tuKhoa } },
      select: {
        id: true,
        taiKhoan: true,
        soDt: true,
        hoTen: true,
        loaiNguoiDung: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  timKiemNguoiDungPhanTrang: async (tuKhoa = "", page = 1, pageSize = 10) => {
    const skip = (parseInt(page) - 1) * parseInt(pageSize);
    const take = parseInt(pageSize);

    return await prisma.nguoiDung.findMany({
      where: { hoTen: tuKhoa ? { contains: tuKhoa } : undefined },
      skip: isNaN(skip) ? 0 : skip,
      take: isNaN(take) ? 10 : take,
      select: {
        id: true,
        taiKhoan: true,
        email: true,
        soDt: true,
        hoTen: true,
        loaiNguoiDung: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  thongTinTaiKhoan: async (userId) => {
    if (typeof userId !== "string") {
      console.error("Lỗi: userId không phải là chuỗi", userId);
      return null;
    }
    return await prisma.nguoiDung.findFirst({
      where: { id: userId }, // Đảm bảo userId là chuỗi
      select: {
        taiKhoan: true,
        email: true,
        soDt: true,
        maNhom: true,
        hoTen: true,
        loaiNguoiDung: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  layThongTinNguoiDung: async (id) => {
    return await prisma.nguoiDung.findFirst({
      where: { id },
      select: {
        id: true,
        taiKhoan: true,
        email: true,
        soDt: true,
        maNhom: true,
        hoTen: true,
        loaiNguoiDung: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  themNguoiDung: async (req) => {
    const { taiKhoan, matKhau, email, soDt, maNhom, loaiNguoiDung, hoTen } =
      req.body;

    const userExists = await prisma.nguoiDung.findFirst({
      where: { taiKhoan },
    });
    if (userExists) throw new BadRequestException("Tài khoản đã tồn tại");

    const passHash = bcrypt.hashSync(matKhau, 10);
    const newUser = await prisma.nguoiDung.create({
      data: {
        taiKhoan,
        matKhau: passHash,
        email,
        soDt,
        maNhom,
        loaiNguoiDung,
        hoTen,
      },
    });

    delete newUser.matKhau;
    return newUser;
  },

  capNhatThongTinNguoiDung: async (req) => {
    const { taiKhoan, matKhau, email, soDt, maNhom, maLoaiNguoiDung, hoTen } =
      req.body;

    const userExists = await prisma.nguoiDung.findFirst({
      where: { taiKhoan },
    });
    if (!userExists) throw new BadRequestException("Tài khoản không tồn tại");

    const passHash = matKhau
      ? bcrypt.hashSync(matKhau, 10)
      : userExists.matKhau;
    const updatedUser = await prisma.nguoiDung.update({
      where: { taiKhoan },
      data: { matKhau: passHash, email, soDt, maNhom, maLoaiNguoiDung, hoTen },
    });

    delete updatedUser.matKhau;
    return updatedUser;
  },

  xoaNguoiDung: async (id) => {
    const user = await prisma.nguoiDung.findUnique({ where: { id } });
    if (!user) {
      throw new Error("Người dùng không tồn tại");
    }

    await prisma.nguoiDung.delete({ where: { id } });

    return { message: "Xóa người dùng thành công" };
  },

  createTokens: (userId) => {
    if (!userId) throw new BadRequestException("Không có userId để tạo token");
    const accessToken = jwt.sign({ userId }, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRED,
    });
    const refreshToken = jwt.sign({ userId }, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRED,
    });
    return { accessToken, refreshToken };
  },
};

export default userService;
