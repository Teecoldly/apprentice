-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 17, 2020 at 05:31 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `corres_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `authentication`
--

CREATE TABLE `authentication` (
  `authen_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `id_card` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `authentication`
--

INSERT INTO `authentication` (`authen_id`, `user_id`, `id_card`, `date`) VALUES
(4, 23, 33, '2020-06-09 07:55:30'),
(5, 22, 35, '2020-06-09 08:31:57'),
(6, 24, 38, '2020-06-10 14:04:32');

-- --------------------------------------------------------

--
-- Table structure for table `caleder`
--

CREATE TABLE `caleder` (
  `event_id` int(11) NOT NULL,
  `room` text COLLATE utf8_unicode_ci NOT NULL,
  `date_timestemp` double NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `comment` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `semeter_label` int(11) DEFAULT 2560
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `caleder`
--

INSERT INTO `caleder` (`event_id`, `room`, `date_timestemp`, `project_id`, `score`, `comment`, `semeter_label`) VALUES
(10, 'สอบกลางภาค //1409', 1593066720000, 27, NULL, NULL, 2560),
(11, 'สอบกลางภาค //1402', 1593147600000, 24, NULL, NULL, 2560),
(12, 'สอบกลางภาค //1401', 1591869600000, NULL, NULL, NULL, 2560);

-- --------------------------------------------------------

--
-- Table structure for table `Director`
--

CREATE TABLE `Director` (
  `group_id` int(11) NOT NULL,
  `Director_1` int(11) DEFAULT NULL,
  `Director_2` int(11) DEFAULT NULL,
  `Director_3` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Director`
--

INSERT INTO `Director` (`group_id`, `Director_1`, `Director_2`, `Director_3`) VALUES
(1, 18, 19, 20),
(2, 19, 20, 21),
(3, 20, 21, 18),
(4, 21, 18, 19);

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `project_id` int(11) NOT NULL,
  `project_name` text COLLATE utf8_unicode_ci NOT NULL,
  `professor_id` int(11) NOT NULL,
  `group_id` int(11) DEFAULT NULL,
  `semeter_label` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`project_id`, `project_name`, `professor_id`, `group_id`, `semeter_label`) VALUES
(22, 'อุปกรณ์รดน้ำอัตโนมัติด้วย แผงโซล่าเซลล์', 17, 3, 2560),
(23, 'อุปกรณ์รดน้ำอัตโนมัติด้วย servo', 17, 1, 2560),
(24, 'เครื่องคัดแยกมะเขือเทศเซอรรี่ด้วยเซนเซอร์อ่านค่าสี', 18, 2, 2560),
(25, 'หุ่นยนต์อัฉริยะกู้ภัยควบคุมด้วยระบบไร้สาย', 19, 3, 2560),
(26, 'เครื่องแยกเหรียญแบบกึ่งอัตโนมัติ', 20, 4, 2560),
(27, 'ประวัติวิทยาลัยเทคโนโลยี สยามบริหารธุรกิจ นนทบุรี ด้วย\r\nเทคโนโลยี AR', 21, 1, 2560),
(29, 'xxxx', 17, NULL, 2560);

-- --------------------------------------------------------

--
-- Table structure for table `Semester`
--

CREATE TABLE `Semester` (
  `Semester` int(11) NOT NULL,
  `Semester_set` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Semester`
--

INSERT INTO `Semester` (`Semester`, `Semester_set`) VALUES
(1, 2560);

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `student_id` int(11) NOT NULL,
  `id_card` int(11) NOT NULL,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `lastname` text COLLATE utf8_unicode_ci NOT NULL,
  `project_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`student_id`, `id_card`, `name`, `lastname`, `project_id`) VALUES
(29, 13442, 'นาย โอภาส', 'ภักดีประพันธ์', 22),
(30, 13443, 'นาย สุรเกียรติ', 'มีญาณเยี่ยม', 22),
(31, 13436, 'นาย ภวินท์', 'สายเชื้อ', 23),
(32, 13633, 'นางสาว เมษญานันจ์', 'บุญตา', 23),
(33, 13782, 'นางสาว วรรษชล', 'จันทร์ดี', 23),
(34, 13918, 'นาย พิชัยยุทธ', 'กิ่งพิลา', 24),
(35, 13895, 'นาย สวิตต์', 'มะระยงค์', 24),
(36, 13936, 'นาย ไอยเรศ', 'มูลประมุข', 25),
(37, 13437, 'นาย ณรงค์ศักดิ์', 'วิรุณพันธิ์', 26),
(38, 13630, 'นาย ศุกันต์', 'สีงาม', 27);

-- --------------------------------------------------------

--
-- Table structure for table `user_info`
--

CREATE TABLE `user_info` (
  `user_id` int(11) NOT NULL,
  `username` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `salt` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_type` int(11) NOT NULL,
  `user_status` tinyint(1) NOT NULL DEFAULT 0,
  `gmail_uid` text COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_info`
--

INSERT INTO `user_info` (`user_id`, `username`, `password`, `email`, `salt`, `name`, `lastname`, `user_type`, `user_status`, `gmail_uid`) VALUES
(17, 'bigbang4542', '$2b$05$yhlRX3hZ1ADXCV7age7ghOqXqngaBV5uTuS/wnt8OekZtbIlLpPcy', 'love45422@gmail.com', '$2b$05$dwtpunOEicJDWJ5VVL8qU.DsG8DdkH8oDePRadvyjBb56J8WxM0bW', 'อณิรุต', 'ศรีวิรัช', 3, 0, '113722661567818829495'),
(18, 'test1', '$2b$05$SRNA9ga4BO9Xw515w2M//uP5YTakcl8o5oZE45z1UL45jU/3GkGT6', '6106021420215@fitm.kmutnb.ac.th', '$2b$05$sWPt97NQ2pNjmU/Ky3up..RAmHmfXUPCstxE8Lq.6EaKJoA03nI.2', 'อ. สุจิตตา', 'ปราการสิริ', 2, 0, '115832435777385547672'),
(19, 'test2', '$2b$05$ICu5AvKnJXWpdQ8YHNJRbeHlzi/HNS/t5zz0450IMcKc3XbLlDl3a', 's6106021420215@email.kmutnb.ac.th', '$2b$05$5Y89DJfQI1iZjGTGv25rWeJJOObUUB4HmdYzjiEXyG9A1A/JVhSDm', 'อ. กานจนา', 'วิมารโชค', 2, 0, '118368519598370718497'),
(20, 'test3', '$2b$05$0Lf3JlQUTc08..cDb5DCGek9iwZpK9U.WwKZJdssEKkvKIZvMdEje', 'cms.iot.kmutnb@gmail.com', '$2b$05$LVSyJqp6ayQC31PRfy7Mc.CVcZM0re/BOnatIa8RGYnwafLxU3Cjm', 'อ. สุจิตา', 'นามงานสกุล', 2, 0, '105693610218370327111'),
(21, 'test4', '$2b$05$R0uQnlS.PJia90nBXhIsq.Y.QsAGrx0uhRhR4kiaBkbh6abehHtT2', 'love45421@hotmail.com', '$2b$05$TVMZYTg.HmC5G4ieP8fzR.qQYibBs7AEBXxF//qwJG6O3C9u6EZx2', 'อ. วิชา', 'สุดกานต์', 2, 0, NULL),
(22, 'student1', '$2b$05$MhbRfA0Gnick8Vmhrr9bT.mrHN69V9N9BxDcgZoh362TJjMZ1kbmG', 'werttwer@hotmail.com', '$2b$05$xNcd0CzGE8Hv594K8JbeHebeaoGsR5Cx27bDw/3sV1io3.BB.uUOe', 'นาย สวิตต์', 'มะระยงค์', 1, 0, NULL),
(23, 'student2', '$2b$05$j.91c2nwl7QVYYmRhgPR5.Vhd3fxdZclcGGH3lOF2PWEUKGrg4xkO', 'love45422@hotmail.com', '$2b$05$uYDKhbOMtyIWDnexwOOk8uFMMaZ0kZg8g.sQMF5FnZKjdsD4BHZ3O', 'นางสาว วรรษชล', 'จันทร์ดี', 1, 0, NULL),
(24, 'student3', '$2b$05$5NssH2ZMqLfaAJNriAKPSuvqWH2tU86x1OoYnpXpktObS.ZvwPfKi', 'love45424@hotmail.com', '$2b$05$z2PuGq1tX4dE2Kbk4BOuROihVHboK/D0F57XqvaX7BNuewIRlAE2C', 'นาย ศุกันต์', 'สีงาม', 1, 0, NULL),
(25, 'love4542', '$2b$05$4OE3WsjJUQp5Wz/OL37d9OqTEOEs7WcityfzJVc.xkW93h8VqBz6S', 'teecoldly@hotmail.com', '$2b$05$WvEtjLiynwHr9B59bcWimOpqGy2qOP1XVjkI4STHE0C8JdNVwcg3S', 'tewst', 'tes', 1, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_type`
--

CREATE TABLE `user_type` (
  `type_id` int(11) NOT NULL,
  `name_type` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `level` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_type`
--

INSERT INTO `user_type` (`type_id`, `name_type`, `level`) VALUES
(1, 'student', 1),
(2, 'Adviser', 2),
(3, 'Head of Department ', 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authentication`
--
ALTER TABLE `authentication`
  ADD PRIMARY KEY (`authen_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `id_card` (`id_card`);

--
-- Indexes for table `caleder`
--
ALTER TABLE `caleder`
  ADD PRIMARY KEY (`event_id`),
  ADD KEY `project_id` (`project_id`);

--
-- Indexes for table `Director`
--
ALTER TABLE `Director`
  ADD PRIMARY KEY (`group_id`),
  ADD KEY `Director_1` (`Director_1`),
  ADD KEY `Director_2` (`Director_2`),
  ADD KEY `Director_3` (`Director_3`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`project_id`),
  ADD KEY `professor_id` (`professor_id`),
  ADD KEY `group_id` (`group_id`);

--
-- Indexes for table `Semester`
--
ALTER TABLE `Semester`
  ADD PRIMARY KEY (`Semester`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`student_id`),
  ADD KEY `project_id` (`project_id`);

--
-- Indexes for table `user_info`
--
ALTER TABLE `user_info`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `user_type` (`user_type`);

--
-- Indexes for table `user_type`
--
ALTER TABLE `user_type`
  ADD PRIMARY KEY (`type_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `authentication`
--
ALTER TABLE `authentication`
  MODIFY `authen_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `caleder`
--
ALTER TABLE `caleder`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `Director`
--
ALTER TABLE `Director`
  MODIFY `group_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `project_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `Semester`
--
ALTER TABLE `Semester`
  MODIFY `Semester` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `user_info`
--
ALTER TABLE `user_info`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `user_type`
--
ALTER TABLE `user_type`
  MODIFY `type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `authentication`
--
ALTER TABLE `authentication`
  ADD CONSTRAINT `authentication_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`user_id`),
  ADD CONSTRAINT `authentication_ibfk_2` FOREIGN KEY (`id_card`) REFERENCES `student` (`student_id`);

--
-- Constraints for table `caleder`
--
ALTER TABLE `caleder`
  ADD CONSTRAINT `caleder_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`);

--
-- Constraints for table `Director`
--
ALTER TABLE `Director`
  ADD CONSTRAINT `Director_ibfk_1` FOREIGN KEY (`Director_1`) REFERENCES `user_info` (`user_id`),
  ADD CONSTRAINT `Director_ibfk_2` FOREIGN KEY (`Director_2`) REFERENCES `user_info` (`user_id`),
  ADD CONSTRAINT `Director_ibfk_3` FOREIGN KEY (`Director_3`) REFERENCES `user_info` (`user_id`);

--
-- Constraints for table `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `project_ibfk_1` FOREIGN KEY (`professor_id`) REFERENCES `user_info` (`user_id`),
  ADD CONSTRAINT `project_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `Director` (`group_id`);

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`);

--
-- Constraints for table `user_info`
--
ALTER TABLE `user_info`
  ADD CONSTRAINT `user_info_ibfk_1` FOREIGN KEY (`user_type`) REFERENCES `user_type` (`type_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
