import { responseSuccess } from "../common/helpers/response.helper.js";
import { rapService } from "../services/rap.service.js";

export const rapController = {
  layThongTinHeThongRap: async (req, res, next) => {
    try {
      const { maHeThongRap } = req.query; // Lấy mã hệ thống rạp từ query
      const data = await rapService.layThongTinHeThongRap(
        parseInt(maHeThongRap)
      ); // Chuyển thành số nguyên
      res.json(responseSuccess(data, "Lấy thông tin hệ thống rạp thành công"));
    } catch (error) {
      next(error);
    }
  },

  layThongTinCumRapTheoHeThong: async (req, res) => {
    try {
      const { maHeThongRap } = req.query; // Lấy mã hệ thống rạp từ query
      if (!maHeThongRap) {
        return res.status(400).json({ message: "Thiếu mã hệ thống rạp" });
      }

      const result = await rapService.layThongTinCumRapTheoHeThong(
        parseInt(maHeThongRap)
      ); // Chuyển thành số nguyên
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi lấy cụm rạp", error });
    }
  },

  layThongTinLichChieuHeThongRap: async (req, res) => {
    try {
      const { maHeThongRap } = req.query;

      // Kiểm tra dữ liệu đầu vào
      if (!maHeThongRap) {
        return res.status(400).json({ message: "Thiếu mã hệ thống rạp" });
      }

      const maHeThongRapNumber = parseInt(maHeThongRap);
      if (isNaN(maHeThongRapNumber)) {
        return res
          .status(400)
          .json({ message: "Mã hệ thống rạp không hợp lệ" });
      }

      // Gọi service để lấy thông tin lịch chiếu
      const result = await rapService.layThongTinLichChieuHeThongRap(
        maHeThongRapNumber
      );

      // Kiểm tra kết quả có dữ liệu không
      if (!result) {
        return res
          .status(404)
          .json({ message: "Không tìm thấy thông tin lịch chiếu" });
      }

      res
        .status(200)
        .json({ message: "Lấy lịch chiếu thành công", data: result });
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi lấy lịch chiếu", error });
    }
  },

  layThongTinLichChieuPhim: async (req, res) => {
    try {
      let { maPhim } = req.query;

      // Kiểm tra nếu maPhim không tồn tại hoặc không hợp lệ
      if (!maPhim) {
        return res.status(400).json({ message: "Thiếu mã phim" });
      }

      maPhim = parseInt(maPhim); // Chuyển maPhim thành số nguyên
      if (isNaN(maPhim)) {
        return res.status(400).json({ message: "Mã phim không hợp lệ" });
      }

      // Gọi service để lấy thông tin lịch chiếu
      const result = await rapService.layThongTinLichChieuPhim(maPhim);

      if (!result || result.length === 0) {
        return res
          .status(404)
          .json({ message: "Không tìm thấy lịch chiếu cho phim này" });
      }

      res.status(200).json({
        message: "Lấy thông tin lịch chiếu phim thành công",
        data: result,
      });
    } catch (error) {
      console.error("Lỗi Prisma:", error);
      res
        .status(500)
        .json({ message: "Lỗi khi lấy lịch chiếu phim", error: error.message });
    }
  },

  themHeThongRap: async (req, res) => {
    try {
      const { tenRap, maCumRap } = req.body;

      // Kiểm tra dữ liệu đầu vào
      if (!tenRap || !maCumRap) {
        return res
          .status(400)
          .json({ message: "Thiếu thông tin rạp hoặc mã cụm rạp" });
      }

      // Gọi service để thêm rạp
      const newRap = await rapService.themHeThongRap({ tenRap, maCumRap });

      res.status(201).json({ message: "Thêm rạp thành công", data: newRap });
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi thêm rạp", error });
    }
  },
};
