const userSwagger = {
  "/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung": {
    get: {
      tags: ["QuanLyNguoiDung"],
      parameters: [
        {
          name: "Authorization",
          in: "header",
          required: true,
          schema: { type: "string" },
          description: "Nhập token bearer",
        },
      ],
      requestBody: {
        description: "Dữ liệu đăng nhập",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                taiKhoan: { type: "string" },
                matKhau: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "success",
        },
      },
    },
  },
  "/api/QuanLyNguoiDung/DangNhap": {
    post: {
      tags: ["QuanLyNguoiDung"],
      requestBody: {
        description: "Dữ liệu đăng nhập",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                taiKhoan: { type: "string" },
                matKhau: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "success",
        },
      },
    },
  },
  "/api/QuanLyNguoiDung/DangKy": {
    post: {
      tags: ["QuanLyNguoiDung"],
      requestBody: {
        description: "Dữ liệu đăng ký",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                taiKhoan: { type: "string" },
                matKhau: { type: "string" },
                email: { type: "string" },
                soDt: { type: "string" },
                maNhom: { type: "string" },
                hoTen: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "success",
        },
      },
    },
  },
  "/api/QuanLyNguoiDung/LayDanhSachNguoiDung": {
    get: {
      tags: ["QuanLyNguoiDung"],
      parameters: [
        {
          name: "MaNhom",
          in: "query",
          required: true,
          schema: {
            type: "string",
            default: "GP01",
          },
        },
        {
          name: "tuKhoa",
          in: "query",
          required: false,
          schema: {
            type: "string",
            default: " ",
          },
        },
      ],
      responses: {
        200: {
          description: "success",
        },
      },
    },
  },
  "/api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang": {
    get: {
      tags: ["QuanLyNguoiDung"],
      parameters: [
        {
          name: "MaNhom",
          in: "query",
          required: false,
          schema: {
            type: "string",
            default: "GP01",
          },
        },
        {
          name: "tuKhoa",
          in: "query",
          required: false,
          schema: {
            type: "string",
            default: "",
          },
        },
        {
          name: "soTrang",
          in: "query",
          required: false,
          schema: {
            type: "integer",
            format: "int32",
            default: 1,
          },
        },
        {
          name: "soPhanTuTrenTrang",
          in: "query",
          required: false,
          schema: {
            type: "integer",
            format: "int32",
            default: 20,
          },
        },
      ],
      responses: {
        200: {
          description: "Success",
        },
      },
    },
  },
  "/api/QuanLyNguoiDung/TimKiemNguoiDung": {
    get: {
      tags: ["QuanLyNguoiDung"],
      parameters: [
        {
          name: "MaNhom",
          in: "query",
          required: true,
          schema: {
            type: "string",
            default: "GP01",
          },
        },
        {
          name: "tuKhoa",
          in: "query",
          required: false,
          schema: {
            type: "string",
            default: " ",
          },
        },
      ],
      responses: {
        200: {
          description: "success",
        },
      },
    },
  },
  "/api/QuanLyNguoiDung/TimKiemNguoiDungPhanTrang": {
    get: {
      tags: ["QuanLyNguoiDung"],
      parameters: [
        {
          name: "MaNhom",
          in: "query",
          required: false,
          schema: {
            type: "string",
            default: "GP01",
          },
        },
        {
          name: "tuKhoa",
          in: "query",
          required: false,
          schema: {
            type: "string",
            default: "",
          },
        },
        {
          name: "soTrang",
          in: "query",
          required: false,
          schema: {
            type: "integer",
            format: "int32",
            default: 1,
          },
        },
        {
          name: "soPhanTuTrenTrang",
          in: "query",
          required: false,
          schema: {
            type: "integer",
            format: "int32",
            default: 1,
          },
        },
      ],
      responses: {
        200: {
          description: "Success",
        },
      },
    },
  },
  "/api/QuanLyNguoiDung/ThongTinTaiKhoan": {
    get: {
      tags: ["QuanLyNguoiDung"],
      parameters: [
        {
          name: "Authorization",
          in: "header",
          required: true,
          schema: {
            type: "string",
          },
          description: "Nhập token bearer",
        },
      ],
      responses: {
        200: {
          description: "Success",
        },
      },
    },
  },
  "/api/QuanLyNguoiDung/LayThongTinNguoiDung": {
    get: {
      tags: ["QuanLyNguoiDung"],
      parameters: [
        {
          name: "taiKhoan",
          in: "query",
          required: false,
          schema: {
            type: "string",
            default: "",
          },
        },
        {
          name: "Authorization",
          in: "header",
          required: true,
          schema: {
            type: "string",
          },
          description: "Nhập token bearer",
        },
      ],
      responses: {
        200: {
          description: "Success",
        },
      },
    },
  },
  "/api/QuanLyNguoiDung/ThemNguoiDung": {
    post: {
      tags: ["QuanLyNguoiDung"],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                taiKhoan: { type: "string" },
                matKhau: { type: "string" },
                email: { type: "string" },
                soDt: { type: "string" },
                maNhom: { type: "string" },
                maLoaiNguoiDung: { type: "string" },
                hoTen: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "success",
        },
      },
    },
  },
  "/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung": {
    put: {
      tags: ["QuanLyNguoiDung"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                taiKhoan: { type: "string" },
                matKhau: { type: "string" },
                email: { type: "string" },
                soDt: { type: "string" },
                maNhom: { type: "string" },
                maLoaiNguoiDung: { type: "string" },
                hoTen: { type: "string" },
              },
              example: {
                taiKhoan: "string",
                matKhau: "string",
                email: "string",
                soDt: "string",
                maNhom: "string",
                maLoaiNguoiDung: "string",
                hoTen: "string",
              },
            },
          },
        },
      },
      parameters: [
        {
          name: "Authorization",
          in: "header",
          required: true,
          schema: {
            type: "string",
          },
          description: "Nhập token bearer",
        },
      ],
      responses: {
        200: {
          description: "Success",
        },
      },
    },
  },
  "/api/QuanLyNguoiDung/UpdateThongTinNguoiDung": {
    post: {
      tags: ["QuanLyNguoiDung"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                taiKhoan: { type: "string" },
                matKhau: { type: "string" },
                email: { type: "string" },
                soDt: { type: "string" },
                maNhom: { type: "string" },
                maLoaiNguoiDung: { type: "string" },
                hoTen: { type: "string" },
              },
              example: {
                taiKhoan: "string",
                matKhau: "string",
                email: "string",
                soDt: "string",
                maNhom: "string",
                maLoaiNguoiDung: "string",
                hoTen: "string",
              },
            },
          },
        },
      },
      parameters: [
        {
          name: "Authorization",
          in: "header",
          required: true,
          schema: {
            type: "string",
          },
          description: "Nhập token bearer",
        },
      ],
      responses: {
        200: {
          description: "Success",
        },
      },
    },
  },
  "/api/QuanLyNguoiDung/XoaNguoiDung": {
    delete: {
      tags: ["QuanLyNguoiDung"],
      parameters: [
        {
          name: "taiKhoan",
          in: "query",
          required: false,
          schema: {
            type: "string",
            default: "",
          },
        },
        {
          name: "Authorization",
          in: "header",
          required: true,
          schema: {
            type: "string",
          },
          description: "Nhập token bearer",
        },
      ],
      responses: {
        200: {
          description: "Success",
        },
      },
    },
  },
};

export default userSwagger;
