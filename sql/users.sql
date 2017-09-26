-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 26, 2017 at 09:43 AM
-- Server version: 10.1.24-MariaDB
-- PHP Version: 7.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fbangular`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(250) NOT NULL,
  `name` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `education` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `education`, `password`) VALUES
(1, 'kranthi', 'kranthik@apostek.com', 'B.Tech', '827ccb0eea8a706c4c34a16891f84e7b'),
(2, 'kumar', 'kumar@gmail.com', 'M.Tech', '827ccb0eea8a706c4c34a16891f84e7b'),
(3, 'dheeraj', 'dheeraj@gmail.com', 'B.Tech', '827ccb0eea8a706c4c34a16891f84e7b'),
(4, 'suraj', 'suraj@gmail.com', 'Phd', '827ccb0eea8a706c4c34a16891f84e7b'),
(5, 'durga', 'durga@gmail.com', 'B.Tech', '827ccb0eea8a706c4c34a16891f84e7b'),
(6, 'rohith', 'rohith@gmail.com', 'B.Tech', '827ccb0eea8a706c4c34a16891f84e7b'),
(7, 'ajay kumar', 'ajay@gmail.com', 'B.Tech', '827ccb0eea8a706c4c34a16891f84e7b'),
(8, 'kishan', 'kishan@gmail.com', 'B.Tech', '827ccb0eea8a706c4c34a16891f84e7b'),
(9, 'shyam', 'shyam@gmail.com', 'Phd', '827ccb0eea8a706c4c34a16891f84e7b'),
(10, 'ashish', 'ashish@gmail.com', 'B.Tech', '827ccb0eea8a706c4c34a16891f84e7b'),
(12, 'ahutosh', 'ashutosh@gmail.com', 'Phd', 'e10adc3949ba59abbe56e057f20f883e'),
(13, 'manish', 'manish@gmail.com', 'B.Tech', '827ccb0eea8a706c4c34a16891f84e7b'),
(14, 'manohar', 'manohar@gmail.com', 'M.Tech', '827ccb0eea8a706c4c34a16891f84e7b');

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
  MODIFY `id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
