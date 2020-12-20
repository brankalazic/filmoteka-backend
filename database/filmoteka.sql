-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.17-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for filmoteka
DROP DATABASE IF EXISTS `filmoteka`;
CREATE DATABASE IF NOT EXISTS `filmoteka` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `filmoteka`;

-- Dumping structure for table filmoteka.administrator
DROP TABLE IF EXISTS `administrator`;
CREATE TABLE IF NOT EXISTS `administrator` (
  `administrator_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL,
  `password_hash` varchar(128) NOT NULL,
  PRIMARY KEY (`administrator_id`),
  UNIQUE KEY `uq_administrator_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table filmoteka.administrator: ~3 rows (approximately)
DELETE FROM `administrator`;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
INSERT INTO `administrator` (`administrator_id`, `username`, `password_hash`) VALUES
	(1, 'lazvel', 'C8A8C60AA9504D6BAFB0904DA739A16099ED5027667104CD62501BC0769E182796366F6084542D318AB6A1F2E4C1240FCB5C336A66E06D918145FB82504C0C7E'),
	(3, 'lazvel43', '6A4C0DC4FCC43BDEA28963DF73E4F8351BCDAE08FDA1516234E8D764AF8178A610BCCA2813D204DFF92A43F0511EB0016C7682CCF7B343D99E01739FC26EF104'),
	(6, 'admin', '52D228DE17AC90DA4F7D20CE7DCB3A0E3C0B0A49B86E35FA6559F90E67185C83AA202521CD9578D48DBED8CD9BC55E32E4A56ED850A0CD9A95CB44268A8A8D36'),
	(7, 'test', 'EE26B0DD4AF7E749AA1A8EE3C10AE9923F618980772E473F8819A5D4940E0DB27AC185F8A0E1D5F84F88BC887FD67B143732C304CC5FA9AD8E6F57F50028A8FF');
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;

-- Dumping structure for table filmoteka.cart
DROP TABLE IF EXISTS `cart`;
CREATE TABLE IF NOT EXISTS `cart` (
  `cart_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`cart_id`),
  KEY `fk_cart_user_id` (`user_id`),
  CONSTRAINT `fk_cart_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table filmoteka.cart: ~0 rows (approximately)
DELETE FROM `cart`;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` (`cart_id`, `user_id`, `created_at`) VALUES
	(9, 78, '2020-12-18 19:26:15');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;

-- Dumping structure for table filmoteka.cart_movie
DROP TABLE IF EXISTS `cart_movie`;
CREATE TABLE IF NOT EXISTS `cart_movie` (
  `cart_movie_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cart_id` int(10) unsigned NOT NULL,
  `movie_id` int(10) unsigned NOT NULL,
  `quantity` int(10) unsigned NOT NULL,
  PRIMARY KEY (`cart_movie_id`),
  UNIQUE KEY `uq_cart_movie_cart_id_movie_id` (`cart_id`,`movie_id`),
  KEY `fk_cart_movie_movie_id` (`movie_id`),
  CONSTRAINT `fk_cart_movie_cart_id` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_cart_movie_movie_id` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`movie_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table filmoteka.cart_movie: ~1 rows (approximately)
DELETE FROM `cart_movie`;
/*!40000 ALTER TABLE `cart_movie` DISABLE KEYS */;
INSERT INTO `cart_movie` (`cart_movie_id`, `cart_id`, `movie_id`, `quantity`) VALUES
	(4, 9, 13, 2);
/*!40000 ALTER TABLE `cart_movie` ENABLE KEYS */;

-- Dumping structure for table filmoteka.comment
DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
  `comment_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `movie_id` int(10) unsigned NOT NULL,
  `original_value` mediumtext NOT NULL,
  `moderated_value` mediumtext DEFAULT NULL,
  `rating_value` tinyint(1) NOT NULL,
  `status` enum('pending','approved','denied') NOT NULL DEFAULT 'pending',
  `moderator_administrator_id` int(10) unsigned DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`comment_id`) USING BTREE,
  UNIQUE KEY `uq_comment_user_id_movie_id` (`user_id`,`movie_id`),
  KEY `fk_comment_moderator_administrator_id` (`moderator_administrator_id`),
  KEY `fk_comment_user_id` (`user_id`) USING BTREE,
  KEY `fk_comment_movie_id` (`movie_id`) USING BTREE,
  CONSTRAINT `fk_comment_moderator_administrator_id` FOREIGN KEY (`moderator_administrator_id`) REFERENCES `administrator` (`administrator_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_rate_movie_id` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`movie_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_rate_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table filmoteka.comment: ~0 rows (approximately)
DELETE FROM `comment`;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` (`comment_id`, `user_id`, `movie_id`, `original_value`, `moderated_value`, `rating_value`, `status`, `moderator_administrator_id`, `created_at`) VALUES
	(1, 77, 12, 'Very funny and interesting movie!', NULL, 6, 'pending', NULL, '2020-12-09 14:50:34'),
	(2, 77, 13, 'Amazing with very good graphics.', NULL, 6, 'pending', NULL, '2020-12-12 18:45:16');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;

-- Dumping structure for table filmoteka.movie
DROP TABLE IF EXISTS `movie`;
CREATE TABLE IF NOT EXISTS `movie` (
  `movie_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `description` text NOT NULL,
  `genre` varchar(64) DEFAULT NULL,
  `year` year(4) NOT NULL,
  `rating` decimal(10,2) unsigned NOT NULL DEFAULT 0.00,
  PRIMARY KEY (`movie_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table filmoteka.movie: ~7 rows (approximately)
DELETE FROM `movie`;
/*!40000 ALTER TABLE `movie` DISABLE KEYS */;
INSERT INTO `movie` (`movie_id`, `name`, `description`, `genre`, `year`, `rating`) VALUES
	(7, 'Johnny English', 'Mr Johhny English is Funny Movie', 'comedy', '2013', 6.20),
	(8, 'Full Moon Transformers', 'Action action action!!', 'action', '2012', 6.90),
	(9, 'Kada jaganjci utihnu', 'horror movie with Anthony Hopkins in main role', 'horror', '2003', 8.22),
	(10, 'LoL', 'Teenage movie', 'romance', '2013', 5.70),
	(11, 'Beneath the Sky', 'yes', NULL, '2015', 4.70),
	(12, 'Return of Johhny English', 'MI6 operative in dangerous and funny action-comedy', 'comedy', '2016', 6.32),
	(13, 'Inception', 'inception movie good movie..', 'Naucna fantastika', '2012', 7.80);
/*!40000 ALTER TABLE `movie` ENABLE KEYS */;

-- Dumping structure for table filmoteka.movie_price
DROP TABLE IF EXISTS `movie_price`;
CREATE TABLE IF NOT EXISTS `movie_price` (
  `movie_price_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `movie_id` int(10) unsigned NOT NULL,
  `price` decimal(10,2) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`movie_price_id`),
  KEY `fk_movie_price_movie_id` (`movie_id`),
  CONSTRAINT `fk_movie_price_movie_id` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`movie_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table filmoteka.movie_price: ~4 rows (approximately)
DELETE FROM `movie_price`;
/*!40000 ALTER TABLE `movie_price` DISABLE KEYS */;
INSERT INTO `movie_price` (`movie_price_id`, `movie_id`, `price`, `created_at`) VALUES
	(1, 7, 3.55, '2020-12-09 13:57:45'),
	(2, 8, 1.39, '2020-12-09 13:57:58'),
	(3, 8, 2.55, '2020-12-09 13:58:08'),
	(4, 13, 1.99, '2020-12-09 18:23:46'),
	(14, 8, 0.99, '2020-12-14 18:11:36');
/*!40000 ALTER TABLE `movie_price` ENABLE KEYS */;

-- Dumping structure for table filmoteka.order
DROP TABLE IF EXISTS `order`;
CREATE TABLE IF NOT EXISTS `order` (
  `order_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cart_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` enum('paid','not paid','waiting') NOT NULL DEFAULT 'waiting',
  PRIMARY KEY (`order_id`),
  UNIQUE KEY `uq_order_cart_id` (`cart_id`),
  KEY `fk_order_user_id` (`cart_id`) USING BTREE,
  CONSTRAINT `fk_order_cart_id` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table filmoteka.order: ~0 rows (approximately)
DELETE FROM `order`;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` (`order_id`, `cart_id`, `created_at`, `status`) VALUES
	(2, 9, '2020-12-18 19:29:53', 'paid');
/*!40000 ALTER TABLE `order` ENABLE KEYS */;

-- Dumping structure for table filmoteka.user
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(64) CHARACTER SET utf8mb4 NOT NULL,
  `email` varchar(64) CHARACTER SET utf8mb4 NOT NULL,
  `forename` varchar(64) NOT NULL,
  `surname` varchar(64) NOT NULL,
  `password_hash` varchar(128) NOT NULL,
  PRIMARY KEY (`user_id`) USING BTREE,
  UNIQUE KEY `uq_user_username` (`username`),
  UNIQUE KEY `uq_username_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- Dumping data for table filmoteka.user: ~2 rows (approximately)
DELETE FROM `user`;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`user_id`, `username`, `email`, `forename`, `surname`, `password_hash`) VALUES
	(77, 'lazvel', 'lazvel@gmail.com', 'laz', 'vel', 'lazvel123'),
	(78, 'test', 'test@test.rs', 'Test', 'Testic', 'EE26B0DD4AF7E749AA1A8EE3C10AE9923F618980772E473F8819A5D4940E0DB27AC185F8A0E1D5F84F88BC887FD67B143732C304CC5FA9AD8E6F57F50028A8FF');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
