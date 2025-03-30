const rapSwagger = {
    "/api/QuanLyRap/LayThongTinHeThongRap": {
      get: {
        tags: ["QuanLyRap"],
        parameters: [
          {
            name: "maHeThongRap",
            in: "query",
            schema: { type: "string" },
            description: "Mã hệ thống rạp"
          }
        ],
        responses: {
          200: {
            description: "Lấy thông tin hệ thống rạp thành công"
          }
        }
      }
    },
    "/api/QuanLyRap/LayThongTinCumRapTheoHeThong": {
      get: {
        tags: ["QuanLyRap"],
        parameters: [
          {
            name: "maHeThongRap",
            in: "query",
            schema: { type: "string" },
            description: "Mã hệ thống rạp"
          }
        ],
        responses: {
          200: {
            description: "Lấy thông tin cụm rạp theo hệ thống thành công"
          }
        }
      }
    },
    "/api/QuanLyRap/LayThongTinLichChieuHeThongRap": {
      get: {
        tags: ["QuanLyRap"],
        parameters: [
          {
            name: "maHeThongRap",
            in: "query",
            schema: { type: "string" },
            description: "Mã hệ thống rạp"
          },
          {
            name: "maNhom",
            in: "query",
            schema: { type: "string", default: "GP01" },
            description: "Mã nhóm"
          }
        ],
        responses: {
          200: {
            description: "Lấy thông tin lịch chiếu hệ thống rạp thành công"
          }
        }
      }
    },
    "/api/QuanLyRap/LayThongTinLichChieuPhim": {
      get: {
        tags: ["QuanLyRap"],
        parameters: [
          {
            name: "MaPhim",
            in: "query",
            schema: { type: "integer", default: 0 },
            description: "Mã phim"
          }
        ],
        responses: {
          200: {
            description: "Lấy thông tin lịch chiếu phim thành công"
          }
        }
      }
    },
    "/api/QuanLyRap/ThemHeThongRap": {
      post: {
        tags: ["QuanLyRap"],
        requestBody: {
          description: "Dữ liệu để thêm rạp mới",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  tenRap: { type: "string" },
                  maHeThongRap: { type: "string" }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: "Thêm rạp thành công"
          }
        }
      }
    },
    "/api/QuanLyRap/CapNhatRap": {
      put: {
        tags: ["QuanLyRap"],
        requestBody: {
          description: "Dữ liệu để cập nhật thông tin rạp",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  maRap: { type: "integer" },
                  tenRap: { type: "string" },
                  diaChi: { type: "string" }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: "Cập nhật rạp thành công"
          }
        }
      }
    },
    "/api/QuanLyRap/XoaRap": {
      delete: {
        tags: ["QuanLyRap"],
        parameters: [
          {
            name: "maRap",
            in: "query",
            schema: { type: "integer" },
            description: "Mã rạp cần xóa"
          }
        ],
        responses: {
          200: {
            description: "Xóa rạp thành công"
          }
        }
      }
    }
  };
  
  export default rapSwagger;
  