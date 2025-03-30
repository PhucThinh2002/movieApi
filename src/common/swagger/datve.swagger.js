const datVeSwagger = {
  "/api/QuanLyDatVe/LayDanhSachPhongVe": {
    get: {
      tags: ["QuanLyDatVe"],
      security: [{ movieAuth: [] }],
      parameters: [
        {
          name: "Authorization",
          in: "header",
          required: true,
          schema: { type: "string" },
          description: "Nhập token bearer"
        }
      ],
      responses: {
        200: {
          description: "Lấy danh sách phòng vé thành công"
        }
      }
    }
  },
  
  "/api/QuanLyDatVe/DatVe": {
    post: {
      tags: ["QuanLyDatVe"],
      security: [{ movieAuth: [] }],
      parameters: [
        {
          name: "Authorization",
          in: "header",
          required: true,
          schema: { type: "string" },
          description: "Nhập token bearer"
        }
      ],
      requestBody: {
        description: "Dữ liệu để đặt vé",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                maLichChieu: { type: "number" },
                danhSachVe: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      maGhe: { type: "number" },
                      giaVe: { type: "number" }
                    }
                  }
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: "Đặt vé thành công"
        }
      }
    }
  },

  "/api/QuanLyDatVe/TaoLichChieu": {
    post: {
      tags: ["QuanLyDatVe"],
      security: [{ movieAuth: [] }],
      parameters: [
        {
          name: "Authorization",
          in: "header",
          required: true,
          schema: { type: "string" },
          description: "Nhập token bearer"
        }
      ],
      requestBody: {
        description: "Dữ liệu để tạo lịch chiếu",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                maPhim: { type: "number" },
                ngayChieuGioChieu: { type: "string" },
                maRap: { type: "string" },
                giaVe: { type: "number" }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: "Tạo lịch chiếu thành công"
        }
      }
    }
  }
};

export default datVeSwagger;
