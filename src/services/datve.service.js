import { BadRequestException } from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";

const datVeService = {
  datVe: async (data, taiKhoan) => {
    const { maLichChieu, danhSachVe } = data;

    // Kiểm tra dữ liệu đầu vào
    if (!maLichChieu || !Array.isArray(danhSachVe) || danhSachVe.length === 0) {
      throw new Error("Dữ liệu không hợp lệ");
    }

    // Kiểm tra xem lịch chiếu có tồn tại không
    const lichChieu = await prisma.lichChieu.findUnique({
      where: { maLichChieu },
    });
    if (!lichChieu) {
      throw new Error("Lịch chiếu không tồn tại");
    }

    // Kiểm tra tài khoản người dùng có tồn tại không
    const nguoiDung = await prisma.nguoiDung.findUnique({
      where: { taiKhoan },
    });
    if (!nguoiDung) {
      throw new Error("Người dùng không tồn tại");
    }

    // Kiểm tra và đặt vé
    const danhSachVeDat = [];
    for (let ve of danhSachVe) {
      const { maGhe } = ve;

      // Kiểm tra ghế có tồn tại không
      const ghe = await prisma.ghe.findUnique({ where: { maGhe } });
      if (!ghe) {
        throw new Error(`Ghế có mã ${maGhe} không tồn tại`);
      }

      // Kiểm tra xem vé đã được đặt chưa
      const veDaDat = await prisma.datVe.findUnique({
        where: {
          taiKhoan_maLichChieu_maGhe: {
            taiKhoan: taiKhoan,
            maLichChieu: maLichChieu,
            maGhe: maGhe,
          },
        },
      });

      if (veDaDat) {
        throw new Error(`Ghế ${maGhe} đã được đặt bởi người dùng khác`);
      }

      // Tạo vé mới
      const veMoi = await prisma.datVe.create({
        data: {
          taiKhoan: taiKhoan,
          maLichChieu: maLichChieu,
          maGhe: maGhe,
        },
      });

      danhSachVeDat.push(veMoi);
    }

    return danhSachVeDat;
  },

  datVeDetail: async (req) => {
    const { tai_khoan, ma_lich_chieu, ma_ghe } = req.params;

    if (!tai_khoan || !ma_lich_chieu || !ma_ghe) {
      throw new BadRequestException("Thiếu thông tin đặt vé");
    }

    const chiTietDatVe = await prisma.datVe.findUnique({
      where: {
        taiKhoan_maLichChieu_maGhe: {
          // Đúng tên của khóa chính trong Prisma
          taiKhoan: tai_khoan, // Không cần `+`, vì taiKhoan là kiểu String
          maLichChieu: Number(ma_lich_chieu), // Chuyển đổi sang Number
          maGhe: Number(ma_ghe), // Chuyển đổi sang Number
        },
      },
      include: {
        NguoiDung: { select: { hoTen: true, email: true, soDt: true } },
        LichChieu: { select: { ngayGioChieu: true, giaVe: true } },
        Ghe: { select: { tenGhe: true, loaiGhe: true } },
      },
    });

    if (!chiTietDatVe) throw new BadRequestException("Không tìm thấy vé");

    return chiTietDatVe;
  },

  createLichChieu: async (req) => {
    let { maPhim, ngayChieuGioChieu, maRap, giaVe } = req.body;

    // Kiểm tra thiếu thông tin
    if (!maPhim || !ngayChieuGioChieu || !maRap || !giaVe) {
      throw new BadRequestException("Thiếu thông tin lịch chiếu");
    }

    // Chuyển đổi ngày giờ thành kiểu DateTime của Prisma
    const ngayGioChieu = new Date(ngayChieuGioChieu);

    // Tạo lịch chiếu mới
    const newLichChieu = await prisma.lichChieu.create({
      data: { maPhim, ngayGioChieu, maRap, giaVe }, // Đổi `ngayChieuGioChieu` thành `ngayGioChieu`
    });

    return newLichChieu;
  },
};

export default datVeService;
