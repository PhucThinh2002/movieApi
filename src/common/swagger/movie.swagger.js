const movieSwagger = {
  "/api/QuanLyPhim/LayDanhSachBanner": {
    get: {
      tags: ["QuanLyPhim"],
      security: [{ movieAuth: [] }],
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
        200: { description: "Success" },
      },
    },
  },
  "/api/QuanLyPhim/LayDanhSachPhim": {
    get: {
      tags: ["QuanLyPhim"],
      security: [{ movieAuth: [] }],
      parameters: [
        {
          name: "maNhom",
          in: "query",
          schema: { type: "string", default: "GP01" },
        },
        { name: "tenPhim", in: "query", schema: { type: "string" } },
      ],
      responses: {
        200: { description: "Success" },
      },
    },
  },
  "/api/QuanLyPhim/LayDanhSachPhimPhanTrang": {
    get: {
      tags: ["QuanLyPhim"],
      security: [{ movieAuth: [] }],
      parameters: [
        {
          name: "maNhom",
          in: "query",
          required: false,
          schema: { type: "string", default: "GP01" },
        },
        {
          name: "tenPhim",
          in: "query",
          required: false,
          schema: { type: "string" },
        },
        {
          name: "soTrang",
          in: "query",
          required: false,
          schema: { type: "integer", default: 1 },
        },
        {
          name: "soPhanTuTrenTrang",
          in: "query",
          required: false,
          schema: { type: "integer", default: 10 },
        }
      ],
      responses: {
        200: {
          description: "Lấy danh sách phim phân trang thành công",
        },
      },
    },
  },
  "/api/QuanLyPhim/LayDanhSachPhimTheoNgay": {
    get: {
      tags: ["QuanLyPhim"],
      security: [{ movieAuth: [] }],
      parameters: [
        {
          name: "maNhom",
          in: "query",
          required: false,
          schema: { type: "string", default: "GP01" }
        },
        {
          name: "tenPhim",
          in: "query",
          required: false,
          schema: { type: "string" }
        },
        {
          name: "soTrang",
          in: "query",
          required: false,
          schema: { type: "integer", default: 1 }
        },
        {
          name: "soPhanTuTrenTrang",
          in: "query",
          required: false,
          schema: { type: "integer", default: 10 }
        },
        {
          name: "tuNgay",
          in: "query",
          required: false,
          schema: { type: "string" }
        },
        {
          name: "denNgay",
          in: "query",
          required: false,
          schema: { type: "string" }
        }
      ],
      responses: {
        200: {
          description: "Lấy danh sách phim theo ngày thành công"
        }
      }
    }
  },
  "/api/QuanLyPhim/LayThongTinPhim": {
    get: {
      tags: ["QuanLyPhim"],
      security: [{ movieAuth: [] }],
      parameters: [
        {
          name: "MaPhim",
          in: "query",
          required: true,
          schema: { type: "integer", default: 0 },
          description: "Mã phim cần lấy thông tin"
        }
      ],
      responses: {
        200: {
          description: "Lấy thông tin phim thành công"
        }
      }
    }
  },
  
  "/api/QuanLyPhim/ThemPhimUploadHinh": {
    post: {
      tags: ["QuanLyPhim"],
      security: [{ movieAuth: [] }],
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
      requestBody: {
        description: "Upload hình phim",
        content: {
          "multipart/form-data": {
            schema: { type: "object", properties: { frm: { type: "array" } } },
          },
        },
      },
      responses: {
        200: { description: "Success" },
      },
    },
  },
  "/api/QuanLyPhim/CapNhatPhimUpload": {
    post: {
      tags: ["QuanLyPhim"],
      security: [{ movieAuth: [] }],
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
      requestBody: {
        description: "Upload hình phim",
        content: {
          "multipart/form-data": {
            schema: { type: "object", properties: { frm: { type: "array" } } },
          },
        },
      },
      responses: {
        200: { description: "Success" },
      },
    },
  },
  "/api/QuanLyPhim/XoaPhim": {
    delete: {
      tags: ["QuanLyPhim"],
      security: [{ movieAuth: [] }],
      parameters: [
        {
          name: "MaPhim",
          in: "query",
          required: false,
          schema: { type: "integer" },
        },
        {
          name: "Authorization",
          in: "header",
          required: true,
          schema: { type: "string" },
          description: "Nhập token bearer",
        }
      ],
      responses: {
        200: { description: "Success" },
      },
    },
  },
};

export default movieSwagger;
