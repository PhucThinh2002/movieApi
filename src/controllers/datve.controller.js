import { responseSuccess } from "../common/helpers/response.helper.js";
import datVeService from "../services/datve.service.js";

const datVeController = {
  datVe: async (req, res, next) => {
    try {
      const taiKhoan = req.user.taiKhoan;
      const veDaDat = await datVeService.datVe(req.body, taiKhoan);
      res.json({ success: true, message: "Đặt vé thành công", data: veDaDat });
    } catch (error) {
      next(error);
    }
  },

  datVeDetail: async (req, res, next) => {
    try {
      const chiTietDatVe = await datVeService.datVeDetail(req);
      const resData = responseSuccess(
        chiTietDatVe,
        "Lấy chi tiết đặt vé thành công",
        200
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },

  createLichChieu: async (req, res, next) => {
    try {
      const newLichChieu = await datVeService.createLichChieu(req);
      const resData = responseSuccess(
        newLichChieu,
        "Tạo lịch chiếu thành công",
        201
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
};

export default datVeController;
