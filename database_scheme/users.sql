-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 30, 2019 at 09:19 AM
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
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `updated_at`, `created_at`) VALUES
(1, 'rahul.chaudhary', 'rahul.chaudhary@velocis.co.in', 'b37e509a6fba146693a295b485bfc15511aa3e2ac641', '2019-08-26 09:56:34', '2019-08-26 15:26:33'),
(2, 'rahul.chaudhary', 'rahul.chaudhary3@velocis.co.in', '9394d7e2bdeb75e8fa549b40eed0014c765f4989', '2019-08-26 11:14:00', '2019-08-26 16:44:00'),
(3, 'rahul.chaudhary', 'rahul.chaudhary1@velocis.co.in', 'cab87505f4fa28b2f69e6252fb4756026c3767', '2019-08-26 11:37:39', '2019-08-26 17:07:39'),
(4, 'rahul.chaudhary', 'rahul.chaudhary2@velocis.co.in', '98fb30b61f65f82b693e9eb319debd007d9dd7', '2019-08-26 11:41:09', '2019-08-26 17:11:09'),
(5, 'rahul.chaudhary', 'rahul.chaudhary4@velocis.co.in', '062cfb2e740e9982f4a2fff84aa2d905ac527d', '2019-08-26 11:42:21', '2019-08-26 17:12:21'),
(6, 'rahul.chaudhary', 'rahul.chaudhar@velocis.co.in', 'c5b13def4dd0173bb3064885916d0beb9c5b2a', '2019-08-26 11:43:05', '2019-08-26 17:13:05'),
(7, 'rahul.chaudhary', 'rahul.chaudhary34@velocis.co.in', '9ca8316df94824d20c6e7ad5534c6d0ea99e7b', '2019-08-26 11:46:37', '2019-08-26 17:16:37'),
(8, 'rahul.chaudhary', 'rahul.chaudhary11@velocis.co.in', '827a34493f4dd901ae3a9fe1b947ab2d31392a', '2019-08-26 11:55:13', '2019-08-26 17:25:13'),
(9, 'rahul.chaudhary', 'rahul.chaudhary31@velocis.co.in', '05e4102add416624fcb03dce7974fbbeb0238e', '2019-08-27 05:48:05', '2019-08-27 11:18:05'),
(10, 'rahul.chaudhary', 'rahul.chaudhary12@velocis.co.in', 'c611e4317601fba4c086aa7b8eae0baef6f09d', '2019-08-27 05:52:12', '2019-08-27 11:22:12'),
(11, 'rahul.chaudhary', 'rahul.chaudhary42@velocis.co.in', '9cc229d578d11e95c3d6f3e113ab9d09945c85', '2019-08-27 05:53:15', '2019-08-27 11:23:15'),
(12, 'rahul.chaudhary', 'rahul.chaudhary21@velocis.co.in', 'e0e906184c5b6c12efcbf0a2ddff2a1cb36954b163', '2019-08-27 11:53:20', '2019-08-27 17:23:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
