import userService from "../services/user.service.js";
import { responseSuccess } from "../common/helpers/response.helper.js";

const userController = {
  layLoaiNguoiDung: async (req, res, next) => {
    try {
      const data = await userService.layDanhSachLoaiNguoiDung();
      res.json(
        responseSuccess(data, "Lấy danh sách loại người dùng thành công")
      );
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const data = await userService.login(req);
      res.json(responseSuccess(data, "Đăng nhập thành công"));
    } catch (error) {
      next(error);
    }
  },

  register: async (req, res, next) => {
    try {
      console.log("✅ req.body tại controller:", req.body);
      const userNew = await userService.register(req.body);
      const resData = responseSuccess(userNew, `Register Successfully`, 200);
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },

  layDanhSachNguoiDung: async (req, res, next) => {
    try {
      const data = await userService.layDanhSachNguoiDung();
      res.json(responseSuccess(data, "Lấy danh sách người dùng thành công"));
    } catch (error) {
      next(error);
    }
  },

  layNguoiDungPhanTrang: async (req, res, next) => {
    try {
      let { soTrang, soPhanTuTrenTrang } = req.query;

      const page = soTrang ? parseInt(soTrang) : 1;
      const pageSize = soPhanTuTrenTrang ? parseInt(soPhanTuTrenTrang) : 20;

      const data = await userService.layDanhSachNguoiDungPhanTrang(
        page,
        pageSize
      );

      res.json(
        responseSuccess(data, "Lấy danh sách người dùng phân trang thành công")
      );
    } catch (error) {
      next(error);
    }
  },

  timKiemNguoiDung: async (req, res, next) => {
    try {
      let { tuKhoa } = req.query;
      if (!tuKhoa) tuKhoa = "";
      const data = await userService.timKiemNguoiDung(tuKhoa);
      res.json(responseSuccess(data, "Tìm kiếm người dùng thành công"));
    } catch (error) {
      next(error);
    }
  },

  timKiemNguoiDungPhanTrang: async (req, res, next) => {
    try {
      const { tuKhoa = "", soTrang = 1, soPhanTuTrenTrang = 10 } = req.query;
      const data = await userService.timKiemNguoiDungPhanTrang(
        tuKhoa,
        soTrang,
        soPhanTuTrenTrang
      );
      res.json(
        responseSuccess(data, "Tìm kiếm người dùng phân trang thành công")
      );
    } catch (error) {
      next(error);
    }
  },

  layThongTinTaiKhoan: async (req, res, next) => {
    try {
      console.log("req.user:", req.user);
      const userId = req.user?.id;

      if (!userId) {
        return res.status(400).json({ message: "User ID không hợp lệ" });
      }

      const data = await userService.thongTinTaiKhoan(userId);
      res.json(responseSuccess(data, "Lấy thông tin tài khoản thành công"));
    } catch (error) {
      next(error);
    }
  },

  layThongTinNguoiDung: async (req, res, next) => {
    try {
      const data = await userService.layThongTinNguoiDung(req.params.id);
      res.json(responseSuccess(data, "Lấy thông tin người dùng thành công"));
    } catch (error) {
      next(error);
    }
  },

  themNguoiDung: async (req, res, next) => {
    try {
      const data = await userService.themNguoiDung(req);
      res.json(responseSuccess(data, "Thêm người dùng thành công"));
    } catch (error) {
      next(error);
    }
  },

  capNhatNguoiDung: async (req, res, next) => {
    try {
      const data = await userService.capNhatThongTinNguoiDung(req);
      res.json(
        responseSuccess(data, "Cập nhật thông tin người dùng thành công")
      );
    } catch (error) {
      next(error);
    }
  },

  xoaNguoiDung: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await userService.xoaNguoiDung(id);
      res.json(responseSuccess(data, "Xóa người dùng thành công"));
    } catch (error) {
      if (error.message === "Người dùng không tồn tại") {
        return res
          .status(404)
          .json(responseSuccess(null, "Người dùng không tồn tại"));
      }
      next(error);
    }
  },
};

export default userController;
