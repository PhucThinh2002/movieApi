import express from 'express';
import datVeController from '../controllers/datve.controller.js';
import { protect } from '../common/middlewares/protect.middleware.js';

const datVeRouter = express.Router();

datVeRouter.get('/datve-detail/:tai_khoan/:ma_lich_chieu/:ma_ghe', protect, datVeController.datVeDetail);

datVeRouter.post('/datvemovie', protect, datVeController.datVe);
datVeRouter.post('/createLichChieu', protect, datVeController.createLichChieu);

export default datVeRouter;
