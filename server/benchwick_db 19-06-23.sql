-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 19, 2023 at 06:25 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `benchwick_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `image_table`
--

CREATE TABLE `image_table` (
  `id` int(11) NOT NULL,
  `name` varchar(52) DEFAULT NULL,
  `variants` varchar(2) DEFAULT NULL,
  `variant_list` varchar(3000) DEFAULT NULL,
  `original_url` varchar(255) DEFAULT NULL,
  `image_name` varchar(60) DEFAULT NULL,
  `image_size` int(11) DEFAULT NULL,
  `created_date` varchar(255) DEFAULT NULL,
  `created_time` varchar(255) DEFAULT NULL,
  `isActive` varchar(12) DEFAULT NULL,
  `create_by` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `image_table`
--

INSERT INTO `image_table` (`id`, `name`, `variants`, `variant_list`, `original_url`, `image_name`, `image_size`, `created_date`, `created_time`, `isActive`, `create_by`, `created_on`, `updated_on`) VALUES
(1, 'varient 2 test', '2', '\'[{\"key\":\"asdsad23\",\"image_url\":\"https://previews.123rf.com/images/weedezign/weedezign1503/weedezign150300696/38084134-plain-wood-texture-background.jpg\"},{\"key\":\"34dwsd3\",\"image_url\":\"https://previews.123rf.com/images/weedezign/weedezign1411/weedezign141100057/33247020-plain-wooden-texture-background-deatil-wood.jpg\"}]\'', 'https://previews.123rf.com/images/weedezign/weedezign1503/weedezign150300696/38084134-plain-wood-texture-background.jpg', 'download.jpg', 7102, '18/06/2023', '7:12:28', 'true', 3, '2023-06-18 08:42:28', '2023-06-18 08:42:28'),
(2, 'varient 9 test', '9', '\'[{\"key\":\"MhF7lN\",\"image_url\":\"https://previews.123rf.com/images/weedezign/weedezign1503/weedezign150300696/38084134-plain-wood-texture-background.jpg\"},{\"key\":\"zhA9K2\",\"image_url\":\"https://previews.123rf.com/images/weedezign/weedezign1411/weedezign141100057/33247020-plain-wooden-texture-background-deatil-wood.jpg\"},{\"key\":\"vFtBcy\",\"image_url\":\"https://previews.123rf.com/images/weedezign/weedezign1503/weedezign150300696/38084134-plain-wood-texture-background.jpg\"},{\"key\":\"GTB6CF\",\"image_url\":\"https://media.istockphoto.com/id/1142424263/photo/light-natural-wood-background.jpg?s=612x612&w=0&k=20&c=F40ZSw8YoLS0BjQnrpI3p_Ni0kSgTNYFQPBkYeJW8Zk=\"},{\"key\":\"2Dovme\",\"image_url\":\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI3b8abyD6WmLdNDFtDF6x5Mk67m8Bqp08klgOc8Mr09Dx9Yo0WvoFAMaqdRFzxWgNO-I\"},{\"key\":\"T2jEya\",\"image_url\":\"https://as1.ftcdn.net/v2/jpg/01/31/62/24/1000_F_131622484_IYjpvAqrec769rFAeIaVsu78ikqrCbtK.jpg\"},{\"key\":\"whZU7a\",\"image_url\":\"https://previews.123rf.com/images/faizu19/faizu192002/faizu19200202159/140017166-wooden-table-texture-for-design-and-artwork-wallpaper-with-copy-space-for-background.jpg\"},{\"key\":\"HsIEeh\",\"image_url\":\"https://media.istockphoto.com/id/1201918805/photo/wood-texture-background-top-view-of-vintage-wooden-table-with-cracks-surface-of-old-knotted.jpg?s=170667a&w=is&k=20&c=E2pTSaPZg70uEe1kBAKpsElZ--YdfHcY0a8l-8VV_uc=\"},{\"key\":\"XhvZnh\",\"image_url\":\"https://media.istockphoto.com/id/175166558/photo/close-view-of-wooden-plank-table.jpg?s=612x612&w=0&k=20&c=-N5xCve4_kkH6Uf-4GISccckWfqYAdneamUUNqH2Ns4=\"}]\'', 'https://previews.123rf.com/images/weedezign/weedezign1503/weedezign150300696/38084134-plain-wood-texture-background.jpg', 'download.jpg', 7102, '18/06/2023', '7:15:59', 'true', 3, '2023-06-18 08:45:59', '2023-06-18 08:45:59'),
(3, 'varient 3 test', '3', '\'[{\"key\":\"MhF7lN\",\"image_url\":\"https://previews.123rf.com/images/weedezign/weedezign1503/weedezign150300696/38084134-plain-wood-texture-background.jpg\"},{\"key\":\"zhA9K2\",\"image_url\":\"https://previews.123rf.com/images/weedezign/weedezign1411/weedezign141100057/33247020-plain-wooden-texture-background-deatil-wood.jpg\"},{\"key\":\"vFtBcy\",\"image_url\":\"https://previews.123rf.com/images/weedezign/weedezign1503/weedezign150300696/38084134-plain-wood-texture-background.jpg\"}]\'', 'https://previews.123rf.com/images/weedezign/weedezign1503/weedezign150300696/38084134-plain-wood-texture-background.jpg', 'download.jpg', 7102, '18/06/2023', '7:17:23', 'true', 3, '2023-06-18 08:47:23', '2023-06-18 08:47:23');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `otp` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `otp`, `role`, `created_on`, `updated_on`) VALUES
(3, 'premji', 'premkumar.t@gramenerit.com', '$2b$10$Z0SjVOhqv2bljsFZAew44O22aEUm1G8ccZ0D.FLgavJrlIEMA33re', NULL, 'admin', '2023-06-16 04:24:42', '2023-06-16 04:24:42');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `image_table`
--
ALTER TABLE `image_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `create_by` (`create_by`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `image_table`
--
ALTER TABLE `image_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `image_table`
--
ALTER TABLE `image_table`
  ADD CONSTRAINT `image_table_ibfk_1` FOREIGN KEY (`create_by`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
