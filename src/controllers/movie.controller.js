import { responseSuccess } from "../common/helpers/response.helper.js";
import movieService from "../services/movie.service.js";

const movieController = {
  getBanners: async (req, res, next) => {
    try {
      const banners = await movieService.getBanners();
      res
        .status(200)
        .json(responseSuccess(banners, "Lấy danh sách banner thành công"));
    } catch (error) {
      next(error);
    }
  },

  getMovies: async (req, res, next) => {
    try {
      const movies = await movieService.getMovies(req);
      res
        .status(200)
        .json(responseSuccess(movies, "Lấy danh sách phim thành công"));
    } catch (error) {
      next(error);
    }
  },

  getMoviesPaginated: async (req, res, next) => {
    try {
      const movies = await movieService.getMoviesPaginated(req);
      res
        .status(200)
        .json(
          responseSuccess(movies, "Lấy danh sách phim phân trang thành công")
        );
    } catch (error) {
      next(error);
    }
  },

  getMoviesByDate: async (req, res, next) => {
    try {
      const movies = await movieService.getMoviesByDate(req);
      res
        .status(200)
        .json(
          responseSuccess(movies, "Lấy danh sách phim theo ngày thành công")
        );
    } catch (error) {
      next(error);
    }
  },

  getMovieById: async (req, res, next) => {
    try {
      const { maPhim } = req.params;
      const movie = await movieService.getMovieById(maPhim);
      res
        .status(200)
        .json(responseSuccess(movie, "Lấy thông tin phim thành công"));
    } catch (error) {
      next(error);
    }
  },

  createMovieWithImage: async (req, res, next) => {
    try {
      // Parse JSON từ body
      const movieData = JSON.parse(req.body.data);

      // Kiểm tra nếu có file hình ảnh thì lấy đường dẫn
      if (req.file) {
        movieData.hinhAnh = `images/${req.file.filename}`;
      }

      const newMovie = await movieService.createMovieWithImage(movieData);
      res.status(201).json({
        status: "success",
        message: "Thêm phim kèm hình thành công",
        data: newMovie,
      });
    } catch (error) {
      next(error);
    }
  },

  updateMovieWithImage: async (req, res, next) => {
    try {
      // Parse JSON từ body
      const movieData = JSON.parse(req.body.data);

      // Kiểm tra nếu có file hình ảnh thì lấy đường dẫn
      if (req.file) {
        movieData.hinhAnh = `images/${req.file.filename}`;
      }

      const updatedMovie = await movieService.updateMovieWithImage(movieData);
      res.status(200).json({
        status: "success",
        message: "Cập nhật phim kèm hình thành công",
        data: updatedMovie,
      });
    } catch (error) {
      next(error);
    }
  },

  deleteMovie: async (req, res, next) => {
    try {
      const { maPhim } = req.params;
      await movieService.deleteMovie(maPhim);
      res.status(200).json(responseSuccess(null, "Xóa phim thành công"));
    } catch (error) {
      next(error);
    }
  },
};

export default movieController;
