import prisma from "../common/prisma/init.prisma.js";
import path from "path";
import fs from "fs";

const movieService = {
  getBanners: async () => {
    return await prisma.banner.findMany();
  },
  getMovies: async (req) => {
    const { maNhom = "GP01", tenPhim } = req.query;

    return await prisma.phim.findMany({
      where: {
        maNhom: maNhom,
        tenPhim: tenPhim ? { contains: tenPhim } : undefined,
      },
    });
  },

  getMoviesPaginated: async (req) => {
    const { maNhom, tenPhim, soTrang = 1, soPhanTuTrenTrang = 10 } = req.query;

    // Ép kiểu số nguyên
    const page = parseInt(soTrang, 10);
    const pageSize = parseInt(soPhanTuTrenTrang, 10);

    // Điều kiện lọc theo maNhom và tenPhim
    // Chỉ dùng mode: "insensitive" trong findMany()
    const whereCondition = {
      ...(maNhom && { maNhom }), // Lọc theo mã nhóm (nếu có)
      ...(tenPhim && {
        tenPhim: { contains: tenPhim }, // Lọc phim theo tên (không phân biệt hoa thường)
      }),
    };

    // Đếm tổng số phim theo điều kiện lọc
    const totalItem = await prisma.phim.count({
      where: whereCondition,
    });

    // Lấy danh sách phim có phân trang
    const movies = await prisma.phim.findMany({
      where: whereCondition,
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return { page, pageSize, totalItem, movies };
  },

  getMoviesByDate: async (req) => {
    const {
      maNhom = "GP01",
      tenPhim = "",
      soTrang = 1,
      soPhanTuTrenTrang = 10,
      tuNgay,
      denNgay,
    } = req.query;

    // Chuyển đổi ngày từ string -> Date (nếu có)
    const fromDate = tuNgay ? new Date(tuNgay) : undefined;
    const toDate = denNgay ? new Date(denNgay) : undefined;

    // Đếm tổng số phim phù hợp bộ lọc
    const totalItem = await prisma.phim.count({
      where: {
        maNhom,
        tenPhim: {
          contains: tenPhim,
        },
        ngayKhoiChieu: {
          gte: fromDate,
          lte: toDate,
        },
      },
    });

    // Lấy danh sách phim theo ngày và phân trang
    const movies = await prisma.phim.findMany({
      where: {
        maNhom,
        tenPhim: {
          contains: tenPhim,
        },
        ngayKhoiChieu: {
          gte: fromDate,
          lte: toDate,
        },
      },
      skip: (soTrang - 1) * soPhanTuTrenTrang,
      take: +soPhanTuTrenTrang,
    });

    return { soTrang, soPhanTuTrenTrang, totalItem, movies };
  },

  getMovieById: async (maPhim) => {
    const maPhimInt = parseInt(maPhim, 10); // Chuyển đổi về số nguyên

    if (isNaN(maPhimInt)) {
      throw new Error("Mã phim không hợp lệ");
    }

    // Tìm phim theo ID
    const movie = await prisma.phim.findUnique({
      where: { maPhim: maPhimInt },
    });

    if (!movie) {
      throw new Error("Phim không tồn tại");
    }

    return movie;
  },

  createMovieWithImage: async (data) => {
    return await prisma.phim.create({
      data: {
        tenPhim: data.tenPhim,
        trailer: data.trailer,
        hinhAnh: data.hinhAnh || null, // Lưu đường dẫn ảnh nếu có
        moTa: data.moTa,
        ngayKhoiChieu: new Date(data.ngayKhoiChieu),
        thoiLuong: Number(data.thoiLuong),
        danhGia: data.danhGia ? Number(data.danhGia) : 0,
        hot: data.hot === "true",
        dangChieu: data.dangChieu === "true",
        sapChieu: data.sapChieu === "true",
        maNhom: data.maNhom || "GP01",
      },
    });
  },

  updateMovieWithImage: async (data) => {
    return await prisma.phim.update({
      where: { maPhim: Number(data.maPhim) }, // Chuyển về số
      data: {
        tenPhim: data.tenPhim,
        trailer: data.trailer,
        hinhAnh: data.hinhAnh || undefined, // Chỉ cập nhật nếu có hình mới
        moTa: data.moTa,
        ngayKhoiChieu: new Date(data.ngayKhoiChieu),
        thoiLuong: Number(data.thoiLuong),
        danhGia: data.danhGia ? Number(data.danhGia) : 0,
        hot: data.hot === "true",
        dangChieu: data.dangChieu === "true",
        sapChieu: data.sapChieu === "true",
        maNhom: data.maNhom || "GP01",
      },
    });
  },

  deleteMovie: async (maPhim) => {
    const maPhimInt = parseInt(maPhim, 10); // Chuyển đổi maPhim thành số nguyên

    if (isNaN(maPhimInt)) {
      throw new Error("Mã phim không hợp lệ");
    }

    // Kiểm tra phim có tồn tại không
    const movie = await prisma.phim.findUnique({
      where: { maPhim: maPhimInt },
    });

    if (!movie) {
      throw new Error("Phim không tồn tại");
    }

    // Nếu phim có hình ảnh, xóa file ảnh trên server
    if (movie.hinhAnh) {
      const imagePath = path.join("images", movie.hinhAnh);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Xóa phim khỏi database
    await prisma.phim.delete({
      where: { maPhim: maPhimInt },
    });
  },
};

export default movieService;
