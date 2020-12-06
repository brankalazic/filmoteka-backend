-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.14-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for filmoteka
CREATE DATABASE IF NOT EXISTS `filmoteka` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `filmoteka`;

-- Dumping structure for table filmoteka.administrator
CREATE TABLE IF NOT EXISTS `administrator` (
  `administrator_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL,
  `password_hash` varchar(128) NOT NULL,
  PRIMARY KEY (`administrator_id`),
  UNIQUE KEY `uq_administrator_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table filmoteka.administrator: ~0 rows (approximately)
DELETE FROM `administrator`;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;

-- Dumping structure for table filmoteka.cart
CREATE TABLE IF NOT EXISTS `cart` (
  `cart_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `movie_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`cart_id`),
  KEY `fk_cart_user_id` (`user_id`),
  KEY `fk_cart_movie_id` (`movie_id`),
  CONSTRAINT `fk_cart_movie_id` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`movie_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_cart_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table filmoteka.cart: ~0 rows (approximately)
DELETE FROM `cart`;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;

-- Dumping structure for table filmoteka.movie
CREATE TABLE IF NOT EXISTS `movie` (
  `movie_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `description` text NOT NULL,
  `genre` varchar(64) DEFAULT NULL,
  `price` decimal(10,2) unsigned NOT NULL DEFAULT 0.00,
  `rating` decimal(10,2) unsigned NOT NULL DEFAULT 0.00,
  PRIMARY KEY (`movie_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table filmoteka.movie: ~6 rows (approximately)
DELETE FROM `movie`;
/*!40000 ALTER TABLE `movie` DISABLE KEYS */;
INSERT INTO `movie` (`movie_id`, `name`, `description`, `genre`, `price`, `rating`) VALUES
	(1, 'Johnny English', 'Mr Johhny English is Funny Movie', 'comedy', 5.00, 6.20),
	(2, 'Transformers', 'autobots vs bad guys', 'action', 3.99, 7.62),
	(3, 'Kada jaganjci utihnu', 'horror movie with Anthony Hopkins in main role', 'horror', 1.25, 8.22),
	(4, 'LoL', 'Teenage movie', 'romance', 1.55, 5.70),
	(5, 'Beneath the Sky', 'yes', NULL, 0.99, 4.70),
	(6, 'Return of Johhny English', 'MI6 operative in dangerous and funny action-comedy', 'comedy', 5.99, 6.32);
/*!40000 ALTER TABLE `movie` ENABLE KEYS */;

-- Dumping structure for table filmoteka.rate
CREATE TABLE IF NOT EXISTS `rate` (
  `rate_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `movie_id` int(10) unsigned NOT NULL,
  `value` text NOT NULL,
  PRIMARY KEY (`rate_id`),
  KEY `fk_rate_user_id` (`user_id`),
  KEY `fk_rate_movie_id` (`movie_id`),
  CONSTRAINT `fk_rate_movie_id` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`movie_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_rate_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table filmoteka.rate: ~0 rows (approximately)
DELETE FROM `rate`;
/*!40000 ALTER TABLE `rate` DISABLE KEYS */;
/*!40000 ALTER TABLE `rate` ENABLE KEYS */;

-- Dumping structure for table filmoteka.user
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(64) NOT NULL,
  `forename` varchar(64) NOT NULL,
  `surname` varchar(64) NOT NULL,
  `username` varchar(64) NOT NULL,
  `password_hash` varchar(128) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `uq_user_username` (`username`) USING BTREE,
  UNIQUE KEY `uq_user_email` (`email`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table filmoteka.user: ~0 rows (approximately)
DELETE FROM `user`;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
