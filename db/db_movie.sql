/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `Banner` (
  `maBanner` int NOT NULL AUTO_INCREMENT,
  `maPhim` int NOT NULL,
  `hinhAnh` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`maBanner`),
  KEY `maPhim` (`maPhim`),
  CONSTRAINT `Banner_ibfk_1` FOREIGN KEY (`maPhim`) REFERENCES `Phim` (`maPhim`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `CumRap` (
  `maCumRap` int NOT NULL AUTO_INCREMENT,
  `tenCumRap` varchar(150) NOT NULL,
  `diaChi` varchar(255) NOT NULL,
  `maHeThongRap` int NOT NULL,
  PRIMARY KEY (`maCumRap`),
  KEY `maHeThongRap` (`maHeThongRap`),
  CONSTRAINT `CumRap_ibfk_1` FOREIGN KEY (`maHeThongRap`) REFERENCES `HeThongRap` (`maHeThongRap`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `DatVe` (
  `taiKhoan` varchar(50) NOT NULL,
  `maLichChieu` int NOT NULL,
  `maGhe` int NOT NULL,
  PRIMARY KEY (`taiKhoan`,`maLichChieu`,`maGhe`),
  KEY `maLichChieu` (`maLichChieu`),
  KEY `maGhe` (`maGhe`),
  CONSTRAINT `DatVe_ibfk_1` FOREIGN KEY (`taiKhoan`) REFERENCES `NguoiDung` (`taiKhoan`) ON DELETE CASCADE,
  CONSTRAINT `DatVe_ibfk_2` FOREIGN KEY (`maLichChieu`) REFERENCES `LichChieu` (`maLichChieu`) ON DELETE CASCADE,
  CONSTRAINT `DatVe_ibfk_3` FOREIGN KEY (`maGhe`) REFERENCES `Ghe` (`maGhe`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Ghe` (
  `maGhe` int NOT NULL AUTO_INCREMENT,
  `tenGhe` varchar(50) DEFAULT NULL,
  `loaighe` enum('THUONG','VIP') DEFAULT 'THUONG',
  `maRap` int NOT NULL,
  PRIMARY KEY (`maGhe`),
  KEY `maRap` (`maRap`),
  CONSTRAINT `Ghe_ibfk_1` FOREIGN KEY (`maRap`) REFERENCES `RapPhim` (`maRap`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `HeThongRap` (
  `maHeThongRap` int NOT NULL AUTO_INCREMENT,
  `tenHeThongRap` varchar(100) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`maHeThongRap`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `LichChieu` (
  `maLichChieu` int NOT NULL AUTO_INCREMENT,
  `maRap` int NOT NULL,
  `maPhim` int NOT NULL,
  `ngayGioChieu` datetime NOT NULL,
  `giaVe` int NOT NULL,
  PRIMARY KEY (`maLichChieu`),
  KEY `maRap` (`maRap`),
  KEY `maPhim` (`maPhim`),
  CONSTRAINT `LichChieu_ibfk_1` FOREIGN KEY (`maRap`) REFERENCES `RapPhim` (`maRap`) ON DELETE CASCADE,
  CONSTRAINT `LichChieu_ibfk_2` FOREIGN KEY (`maPhim`) REFERENCES `Phim` (`maPhim`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `NguoiDung` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `taiKhoan` varchar(50) NOT NULL,
  `matKhau` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `soDt` varchar(15) DEFAULT NULL,
  `maNhom` varchar(10) NOT NULL,
  `hoTen` varchar(100) NOT NULL,
  `loainguoidung` enum('USER','ADMIN') DEFAULT 'USER',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `taiKhoan` (`taiKhoan`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Phim` (
  `maPhim` int NOT NULL AUTO_INCREMENT,
  `tenPhim` varchar(255) NOT NULL,
  `trailer` varchar(255) DEFAULT NULL,
  `hinhAnh` varchar(255) DEFAULT NULL,
  `moTa` text,
  `ngayKhoiChieu` datetime NOT NULL,
  `thoiLuong` int NOT NULL,
  `danhGia` tinyint DEFAULT '0',
  `hot` tinyint(1) DEFAULT '0',
  `dangChieu` tinyint(1) DEFAULT '0',
  `sapChieu` tinyint(1) DEFAULT '0',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `maNhom` varchar(10) NOT NULL DEFAULT 'GP01',
  PRIMARY KEY (`maPhim`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `RapPhim` (
  `maRap` int NOT NULL AUTO_INCREMENT,
  `tenRap` varchar(100) NOT NULL,
  `maCumRap` int NOT NULL,
  PRIMARY KEY (`maRap`),
  KEY `maCumRap` (`maCumRap`),
  CONSTRAINT `RapPhim_ibfk_1` FOREIGN KEY (`maCumRap`) REFERENCES `CumRap` (`maCumRap`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Banner` (`maBanner`, `maPhim`, `hinhAnh`) VALUES
(1, 1, 'anh.jpg');


INSERT INTO `CumRap` (`maCumRap`, `tenCumRap`, `diaChi`, `maHeThongRap`) VALUES
(1, 'CGV Vincom', '72 Le Thanh Ton, Q1, HCM', 1);
INSERT INTO `CumRap` (`maCumRap`, `tenCumRap`, `diaChi`, `maHeThongRap`) VALUES
(2, 'Lotte Mart', '469 Nguyen Huu Tho, HCM', 2);


INSERT INTO `DatVe` (`taiKhoan`, `maLichChieu`, `maGhe`) VALUES
('thinh123', 1, 1);
INSERT INTO `DatVe` (`taiKhoan`, `maLichChieu`, `maGhe`) VALUES
('thinh123', 1, 2);
INSERT INTO `DatVe` (`taiKhoan`, `maLichChieu`, `maGhe`) VALUES
('thinh123', 1, 3);
INSERT INTO `DatVe` (`taiKhoan`, `maLichChieu`, `maGhe`) VALUES
('user01', 1, 1),
('user01', 2, 3);

INSERT INTO `Ghe` (`maGhe`, `tenGhe`, `loaighe`, `maRap`) VALUES
(1, 'A1', 'VIP', 1);
INSERT INTO `Ghe` (`maGhe`, `tenGhe`, `loaighe`, `maRap`) VALUES
(2, 'A2', 'THUONG', 1);
INSERT INTO `Ghe` (`maGhe`, `tenGhe`, `loaighe`, `maRap`) VALUES
(3, 'B1', 'VIP', 2);

INSERT INTO `HeThongRap` (`maHeThongRap`, `tenHeThongRap`, `logo`) VALUES
(1, 'CGV', 'cgv_logo.jpg');
INSERT INTO `HeThongRap` (`maHeThongRap`, `tenHeThongRap`, `logo`) VALUES
(2, 'Lotte Cinema', 'lotte_logo.jpg');


INSERT INTO `LichChieu` (`maLichChieu`, `maRap`, `maPhim`, `ngayGioChieu`, `giaVe`) VALUES
(1, 1, 1, '2024-12-15 19:00:00', 100000);
INSERT INTO `LichChieu` (`maLichChieu`, `maRap`, `maPhim`, `ngayGioChieu`, `giaVe`) VALUES
(2, 2, 2, '2024-11-10 20:00:00', 120000);
INSERT INTO `LichChieu` (`maLichChieu`, `maRap`, `maPhim`, `ngayGioChieu`, `giaVe`) VALUES
(4, 1, 2, '2025-04-01 13:00:00', 20000);

INSERT INTO `NguoiDung` (`id`, `taiKhoan`, `matKhau`, `email`, `soDt`, `maNhom`, `hoTen`, `loainguoidung`, `createdAt`, `updatedAt`) VALUES
('7f5ba067-8021-4ebf-9710-da58c33d6f5b', 'test123', '$2b$10$7eUuLpRlz0Oeu1QaNkr/OeGfHNxsDjhu2T3WetTFdeZBVr9tb176a', 'test@gmail.com', '0987654321', 'GP01', 'Duong Van B', 'USER', '2025-03-28 07:42:28', '2025-03-28 07:42:28');
INSERT INTO `NguoiDung` (`id`, `taiKhoan`, `matKhau`, `email`, `soDt`, `maNhom`, `hoTen`, `loainguoidung`, `createdAt`, `updatedAt`) VALUES
('ad57577a-0ac7-11f0-b6bb-0242ac110002', 'user01', 'password123', 'user01@gmail.com', '0123456789', 'GP01', 'Nguyen Van A', 'USER', '2025-03-27 04:55:17', '2025-03-27 04:55:17');
INSERT INTO `NguoiDung` (`id`, `taiKhoan`, `matKhau`, `email`, `soDt`, `maNhom`, `hoTen`, `loainguoidung`, `createdAt`, `updatedAt`) VALUES
('ad576e5a-0ac7-11f0-b6bb-0242ac110002', 'admin01', 'adminpassword', 'admin@gmail.com', '0987654321', 'GP01', 'Admin User', 'ADMIN', '2025-03-27 04:55:17', '2025-03-27 04:55:17');
INSERT INTO `NguoiDung` (`id`, `taiKhoan`, `matKhau`, `email`, `soDt`, `maNhom`, `hoTen`, `loainguoidung`, `createdAt`, `updatedAt`) VALUES
('cc5ff8ec-f472-48af-926d-ec4b944ef1fb', 'thinh123', '$2b$10$.Ma0aZVlW11gcQd5SXYE5OCN5G4PTr.jMUg27NQj.YzWU53DOtKyi', 'thinh@example.com', '0987654321', 'GP01', 'Duong Phuc Thinh', 'USER', '2025-03-27 04:55:45', '2025-03-27 04:55:45');

INSERT INTO `Phim` (`maPhim`, `tenPhim`, `trailer`, `hinhAnh`, `moTa`, `ngayKhoiChieu`, `thoiLuong`, `danhGia`, `hot`, `dangChieu`, `sapChieu`, `createdAt`, `updatedAt`, `maNhom`) VALUES
(1, 'Avengers: Endgame', 'https://youtu.be/TcMBFSGVi1c', 'avengers.jpg', 'Hành trình cuối cùng của Avengers', '2024-12-15 18:00:00', 0, 9, 1, 1, 0, '2025-03-27 04:55:17', '2025-03-27 04:55:17', 'GP01');
INSERT INTO `Phim` (`maPhim`, `tenPhim`, `trailer`, `hinhAnh`, `moTa`, `ngayKhoiChieu`, `thoiLuong`, `danhGia`, `hot`, `dangChieu`, `sapChieu`, `createdAt`, `updatedAt`, `maNhom`) VALUES
(2, 'Spiderman: No Way Home', 'https://youtu.be/JfVOs4VSpmA', 'spiderman.jpg', 'Người Nhện trở lại!', '2024-11-10 18:00:00', 0, 8, 1, 1, 0, '2025-03-27 04:55:17', '2025-03-27 04:55:17', 'GP01');


INSERT INTO `RapPhim` (`maRap`, `tenRap`, `maCumRap`) VALUES
(1, 'Rap 1', 1);
INSERT INTO `RapPhim` (`maRap`, `tenRap`, `maCumRap`) VALUES
(2, 'Rap 2', 2);
INSERT INTO `RapPhim` (`maRap`, `tenRap`, `maCumRap`) VALUES
(3, 'Rạp Galaxy Nguyễn Du', 2);
INSERT INTO `RapPhim` (`maRap`, `tenRap`, `maCumRap`) VALUES
(4, 'Rạp CGV Vincom', 1);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;