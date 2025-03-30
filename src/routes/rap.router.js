import express from "express";
import { rapController } from "../controllers/rap.controller.js";

const rapRouter = express.Router();

rapRouter.get("/LayThongTinHeThongRap", rapController.layThongTinHeThongRap);
rapRouter.get("/LayThongTinCumRapTheoHeThong", rapController.layThongTinCumRapTheoHeThong);
rapRouter.get("/LayThongTinLichChieuHeThongRap", rapController.layThongTinLichChieuHeThongRap);
rapRouter.get("/LayThongTinLichChieuPhim", rapController.layThongTinLichChieuPhim);

rapRouter.post("/ThemHeThongRap", rapController.themHeThongRap);

export default rapRouter;
