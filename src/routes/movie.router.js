import express from 'express';
import movieController from '../controllers/movie.controller.js';
import { protect } from '../common/middlewares/protect.middleware.js';
import uploadLocal from '../common/multer/local.multer.js';

const movieRouter = express.Router();

movieRouter.get('/banners', protect, movieController.getBanners);
movieRouter.get('/movies', protect, movieController.getMovies);
movieRouter.get('/movies/paginate', protect, movieController.getMoviesPaginated);
movieRouter.get('/movies/by-date', protect, movieController.getMoviesByDate);
movieRouter.get('/movies/:maPhim', protect, movieController.getMovieById);

movieRouter.post('/movies/uploadhinhanh', protect, uploadLocal.single("hinh_anh"), movieController.createMovieWithImage);
movieRouter.post('/movies/update', protect, uploadLocal.single("hinh_anh"),  movieController.updateMovieWithImage);

movieRouter.delete('/movies/:maPhim', protect, movieController.deleteMovie);

export default movieRouter;