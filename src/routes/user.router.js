import express from 'express';
import userController from '../controllers/user.controller.js';
import { protect } from '../common/middlewares/protect.middleware.js';

const userRouter = express.Router();

userRouter.get('/LayDanhSachLoaiNguoiDung', protect, userController.layLoaiNguoiDung);
userRouter.get('/LayDanhSachNguoiDung', protect, userController.layDanhSachNguoiDung);
userRouter.get('/LayDanhSachNguoiDungPhanTrang', protect, userController.layNguoiDungPhanTrang);
userRouter.get('/TimKiemNguoiDung', protect, userController.timKiemNguoiDung);
userRouter.get('/TimKiemNguoiDungPhanTrang', protect, userController.timKiemNguoiDungPhanTrang);
userRouter.get('/ThongTinTaiKhoan', protect, userController.layThongTinTaiKhoan);
userRouter.get('/LayThongTinNguoiDung/:id', protect, userController.layThongTinNguoiDung);

userRouter.post('/login', userController.login);
userRouter.post('/register', userController.register);
userRouter.post('/ThemNguoiDung', protect, userController.themNguoiDung);

userRouter.put('/CapNhatThongTinNguoiDung', protect, userController.capNhatNguoiDung);

userRouter.delete('/XoaNguoiDung/:id', protect, userController.xoaNguoiDung);

export default userRouter;
