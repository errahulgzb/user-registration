-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 12, 2019 at 12:16 PM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `employeedb`
--

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `task` varchar(200) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `user_id`, `task`, `status`, `updated_at`, `created_at`) VALUES
(1, 12, 'Find bugs', 1, '2019-09-11 09:23:44', '2016-04-10 23:50:40'),
(2, 12, 'Review code', 1, '2019-09-11 09:23:44', '2016-04-10 23:50:40'),
(3, 12, 'Fix bugs', 1, '2019-09-11 09:23:44', '2016-04-10 23:50:40'),
(4, 11, 'Refactor Code', 1, '2019-09-11 09:23:44', '2016-04-10 23:50:40'),
(5, 11, 'Push to prod', 1, '2019-09-11 09:23:44', '2016-04-10 23:50:50');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile_img` varchar(255) DEFAULT NULL,
  `status` enum('0','1') NOT NULL DEFAULT '1',
  `jwt_user_token` mediumtext,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `profile_img`, `status`, `jwt_user_token`, `updated_at`, `created_at`) VALUES
(1, 'rahul.chaudhary', 'rahul.chaudhary@velocis.co.in', 'b37e509a6fba146693a295b485bfc15511aa3e2ac641', '', '1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTY4Mjc3NzMwLCJleHAiOjE1NjgyODEzMzB9.zP8I3yDuuNI6Mf44shU2RLRfYYBAp3o36U0S0jXWM4A', '2019-08-26 09:56:34', '2019-08-26 15:26:33'),
(2, 'rahul.chaudhary', 'rahul.chaudhary3@velocis.co.in', '9394d7e2bdeb75e8fa549b40eed0014c765f4989', '', '1', '', '2019-08-26 11:14:00', '2019-08-26 16:44:00'),
(3, 'rahul.chaudhary', 'rahul.chaudhary1@velocis.co.in', 'cab87505f4fa28b2f69e6252fb4756026c3767', '', '1', '', '2019-08-26 11:37:39', '2019-08-26 17:07:39'),
(4, 'rahul.chaudhary', 'rahul.chaudhary2@velocis.co.in', '98fb30b61f65f82b693e9eb319debd007d9dd7', '', '1', '', '2019-08-26 11:41:09', '2019-08-26 17:11:09'),
(5, 'rahul.chaudhary', 'rahul.chaudhary4@velocis.co.in', '062cfb2e740e9982f4a2fff84aa2d905ac527d', '', '1', '', '2019-08-26 11:42:21', '2019-08-26 17:12:21'),
(6, 'rahul.chaudhary', 'rahul.chaudhar@velocis.co.in', 'c5b13def4dd0173bb3064885916d0beb9c5b2a', '', '1', '', '2019-08-26 11:43:05', '2019-08-26 17:13:05'),
(7, 'rahul.chaudhary', 'rahul.chaudhary34@velocis.co.in', '9ca8316df94824d20c6e7ad5534c6d0ea99e7b', '', '1', '', '2019-08-26 11:46:37', '2019-08-26 17:16:37'),
(8, 'rahul.chaudhary', 'rahul.chaudhary11@velocis.co.in', '827a34493f4dd901ae3a9fe1b947ab2d31392a', '', '1', '', '2019-08-26 11:55:13', '2019-08-26 17:25:13'),
(9, 'rahul.chaudhary', 'rahul.chaudhary31@velocis.co.in', '05e4102add416624fcb03dce7974fbbeb0238e', '', '1', '', '2019-08-27 05:48:05', '2019-08-27 11:18:05'),
(10, 'rahul chaudhary', 'rahul.chaudhary12@velocis.co.in', 'c611e4317601fba4c086aa7b8eae0baef6f09d', '1567749086018scanner_20190827_170527.jpg', '1', '', '2019-08-27 05:52:12', '2019-08-27 11:22:12'),
(11, 'rahulchaudhary', 'rahul.chaudhary42@velocis.co.in', '9cc229d578d11e95c3d6f3e113ab9d09945c85', '1567747282749M2.jpg', '1', '', '2019-08-27 05:53:15', '2019-08-27 11:23:15'),
(12, 'rahul chaudhary', 'rahul.chaudhary21@velocis.co.in', 'e0e906184c5b6c12efcbf0a2ddff2a1cb36954b163', '1567429830015IMG_20190522_202111_459.jpg', '1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImlhdCI6MTU2ODI4MzE3MiwiZXhwIjoxNTY4MjgzMjcyfQ.m5-54O5TgR7Gyfqyhbra0sOWLNIRWiZw0v3aZIdF_4M', '2019-08-27 11:53:20', '2019-08-27 17:23:20'),
(13, 'rahul.chaudhary', '', '', 'IMG_20190522_202111_459.jpg', '1', '', '2019-08-30 10:12:46', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
