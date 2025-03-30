import prisma from "../common/prisma/init.prisma.js";
export const rapService = {
  layThongTinHeThongRap: async (maHeThongRap) => {
    const whereCondition = maHeThongRap
      ? { maHeThongRap: parseInt(maHeThongRap) }
      : {}; // Chuyển mã thành số

    return await prisma.heThongRap.findMany({
      where: whereCondition,
      select: {
        maHeThongRap: true,
        tenHeThongRap: true,
        logo: true,
        CumRap: {
          select: {
            maCumRap: true,
            tenCumRap: true,
            diaChi: true,
            RapPhim: {
              select: {
                maRap: true,
                tenRap: true,
              },
            },
          },
        },
      },
    });
  },

  layThongTinCumRapTheoHeThong: async (maHeThongRap) => {
    return await prisma.cumRap.findMany({
      where: {
        maHeThongRap: parseInt(maHeThongRap), // Chỉ lấy dữ liệu theo mã hệ thống rạp
      },
      select: {
        maCumRap: true,
        tenCumRap: true,
        diaChi: true,
        maHeThongRap: true,
      },
    });
  },

  layThongTinLichChieuHeThongRap: async (maHeThongRap) => {
    return await prisma.heThongRap.findFirst({
      where: { maHeThongRap: parseInt(maHeThongRap) }, // Đảm bảo kiểu Int hợp lệ
      select: {
        maHeThongRap: true,
        tenHeThongRap: true,
        logo: true,
        CumRap: {
          select: {
            maCumRap: true,
            tenCumRap: true,
            diaChi: true,
            RapPhim: {
              select: {
                maRap: true,
                tenRap: true,
                LichChieu: {
                  select: {
                    maLichChieu: true,
                    ngayGioChieu: true, // Sửa đúng tên trường
                    giaVe: true,
                    Phim: {
                      select: {
                        maPhim: true,
                        tenPhim: true,
                        hinhAnh: true,
                        moTa: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  },

  layThongTinLichChieuPhim: async (maPhim) => {
    return await prisma.lichChieu.findMany({
      where: { maPhim: maPhim },
      select: {
        maLichChieu: true,
        ngayGioChieu: true,
        giaVe: true,
        RapPhim: {
          select: {
            maRap: true,
            tenRap: true,
            CumRap: {
              // Lấy CumRap từ RapPhim
              select: {
                maCumRap: true,
                tenCumRap: true,
                diaChi: true,
              },
            },
          },
        },
        Phim: {
          select: {
            maPhim: true,
            tenPhim: true,
            hinhAnh: true,
          },
        },
      },
    });
  },

  themHeThongRap: async ({ tenRap, maCumRap }) => {
    return await prisma.rapPhim.create({
      data: {
        tenRap,
        maCumRap,
      },
    });
  },
};
