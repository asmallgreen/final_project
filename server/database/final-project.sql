-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2023-09-21 15:49:57
-- 伺服器版本： 10.4.28-MariaDB
-- PHP 版本： 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `final_project`
--

-- --------------------------------------------------------

--
-- 資料表結構 `member`
--

CREATE TABLE `member` (
  `id` int(6) UNSIGNED NOT NULL,
  `account` varchar(30) NOT NULL,
  `password` varchar(50) NOT NULL,
  `name` varchar(12) NOT NULL,
  `gender` tinyint(2) DEFAULT NULL,
  `birthday` date NOT NULL,
  `email` varchar(30) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `address` varchar(50) NOT NULL,
  `level` int(3) UNSIGNED NOT NULL,
  `member_img` varchar(40) NOT NULL,
  `created_at` datetime NOT NULL,
  `valid` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `member`
--

INSERT INTO `member` (`id`, `account`, `password`, `name`, `gender`, `birthday`, `email`, `phone`, `address`, `level`, `member_img`, `created_at`, `valid`) VALUES
(1, 'Luna', '827ccb0eea8a706c4c34a16891f84e7b', '林怡君', 2, '1998-08-08', 'luna@test.com', '0912345678', '高雄市林園區大馬路123號', 1, 'cat_avatar.jpg', '2023-07-06 17:00:21', 0),
(2, 'Kate', '827ccb0eea8a706c4c34a16891f84e7b', '王小花', 2, '2023-02-02', 'kate@test.com', '0912445883', '桃園市中壢區新生路52號', 2, 'avatar01.jpg', '2023-07-06 17:19:30', 1),
(3, 'Ming', '827ccb0eea8a706c4c34a16891f84e7b', '吳小明', 1, '2023-03-03', 'ming@test.com', '0911558945', '新竹市東區中正路88號', 1, 'avatar01.jpg', '2023-07-06 17:21:47', 1),
(4, 'Alan', '827ccb0eea8a706c4c34a16891f84e7b', '陳小華', 1, '2023-04-04', 'alan@test.com', '0911448765', '台北市新莊區莊敬路55號', 1, 'avatar01.jpg', '2023-07-06 17:40:46', 1),
(5, 'Jason', '827ccb0eea8a706c4c34a16891f84e7b', '劉小安', 2, '2023-05-05', 'jason@test.com', '0911589452', '基隆市仁愛區安樂路49號', 1, 'avatar01.jpg', '2023-07-06 17:43:31', 1),
(6, 'Amy', '827ccb0eea8a706c4c34a16891f84e7b', '陳小美', 2, '2023-07-12', 'amy@test.com', '0911589456', '新北市三重區中正路889號', 2, 'avatar01.jpg', '2023-07-07 15:38:28', 1),
(7, 'Ken', '827ccb0eea8a706c4c34a16891f84e7b', '李小成', 1, '2023-06-06', 'ken@test.com', '0911587956', '花蓮縣花蓮市吉安路77號', 3, 'avatar01.jpg', '2023-07-07 18:02:19', 1),
(8, 'Yuki', '827ccb0eea8a706c4c34a16891f84e7b', '游小婷', 2, '2023-04-27', 'yuki@test.com', '0955236485', '台東縣金峰鄉一路5號', 1, 'avatar01.jpg', '2023-07-07 18:10:30', 1),
(9, 'Andy', '827ccb0eea8a706c4c34a16891f84e7b', '黃小安', 1, '2023-07-14', 'andy@test.com', '0987884569', '彰化縣二水鄉向上一路8號', 1, 'avatar01.jpg', '2023-07-07 18:12:09', 1),
(10, 'Froggy', '827ccb0eea8a706c4c34a16891f84e7b', '邱小瓜', 1, '2023-07-06', 'froggy@test.com', '0915445889', '基隆市中正區123路44號', 1, 'avatar01.jpg', '2023-07-07 18:17:04', 1),
(11, 'Yuma', '827ccb0eea8a706c4c34a16891f84e7b', '葉小花', 2, '2023-01-04', 'yuma@test.com', '0988447878', '台北市中山區光華路77號', 1, 'avatar01.jpg', '2023-07-07 18:43:43', 1),
(12, 'Ray', '827ccb0eea8a706c4c34a16891f84e7b', '吳小華', 1, '2023-07-05', 'ray@test.com', '0911558794', '雲林縣褒忠鄉中正路87號', 2, 'avatar01.jpg', '2023-07-11 15:19:07', 1),
(13, 'Alen', '827ccb0eea8a706c4c34a16891f84e7b', '陳曉明', 1, '2023-07-10', 'alen@test.com', '0944215675', '花蓮縣花蓮市123', 1, 'avatar01.jpg', '2023-07-13 17:20:46', 1),
(14, 'Keven', '827ccb0eea8a706c4c34a16891f84e7b', '徐小凱', 1, '2023-02-18', 'keven@test.com', '0937998458', '彰化縣埔鹽鄉祥雲路1號', 2, 'avatar01.jpg', '2023-07-13 18:06:50', 1),
(15, 'Susan', '827ccb0eea8a706c4c34a16891f84e7b', '廖小云', 2, '2023-04-02', 'susan@test.com', '0987448106', '澎湖縣馬公市大海路6弄29號', 3, 'avatar01.jpg', '2023-07-13 18:07:44', 1),
(16, 'Jane', '827ccb0eea8a706c4c34a16891f84e7b', '陸小雨', 2, '2023-01-25', 'jane@test.com', '0988157693', '嘉義市西區成功路6巷48號', 1, 'avatar01.jpg', '2023-07-13 18:08:40', 1),
(17, 'Jennifer', '827ccb0eea8a706c4c34a16891f84e7b', '甄小妮', 2, '2023-06-11', 'jennifer@test.com', '0954884125', '桃園市桃園區經國路58號', 1, 'avatar01.jpg', '2023-07-13 18:09:17', 1),
(18, 'Jenny', '827ccb0eea8a706c4c34a16891f84e7b', '于柔建', 2, '2022-07-20', 'jenny@test.com', '0934840562', '彰化縣社頭鄉延平街433號之1', 1, 'avatar01.jpg', '2023-07-14 13:09:45', 1),
(19, 'Mary', '827ccb0eea8a706c4c34a16891f84e7b', '馬怡岱', 2, '2023-03-07', 'mary@test.com', '0924248477', '臺中市大里區中興路１段298巷275號15樓', 1, 'avatar01.jpg', '2023-07-14 13:09:45', 1),
(20, 'Suan', '827ccb0eea8a706c4c34a16891f84e7b', '于培珊', 2, '2019-04-23', 'suan@tes.com', '0935754681', '苗栗縣苑裡鎮健康二街97號6樓', 1, 'avatar01.jpg', '2023-07-14 13:12:50', 1),
(21, 'Lesley', '827ccb0eea8a706c4c34a16891f84e7b', '謝霖君', 1, '2021-10-15', 'lesley@test.com', '0938271546', '桃園市新屋區東勢315號15樓', 1, 'avatar01.jpg', '2023-07-14 13:12:50', 1),
(22, 'Winnie', '827ccb0eea8a706c4c34a16891f84e7b', '陳玟寧', 0, '2022-11-18', 'winnie@test.com', '0912496852', '新北市永和區中和路65號5樓', 1, 'avatar01.jpg', '2023-07-14 19:54:20', 1),
(23, 'Salesha', '827ccb0eea8a706c4c34a16891f84e7b', '莊馥瑀', 2, '2022-11-18', 'salesha@test.com', '0912496852', '台中市西區台灣大道1段52號8樓', 1, 'avatar01.jpg', '2023-07-14 20:02:13', 1),
(24, 'Keiki', '827ccb0eea8a706c4c34a16891f84e7b', '楊慧淇', 2, '2022-11-18', 'keiki@test.com', '0912496852', '新北市永和區中和路65號5樓', 1, 'avatar01.jpg', '2023-07-14 20:02:43', 1),
(25, 'May', '827ccb0eea8a706c4c34a16891f84e7b', '廖玉梅', 2, '2022-11-18', 'may@test.com', '0912496852', '新北市永和區中和路65號5樓', 1, 'avatar01.jpg', '2023-07-14 20:04:01', 1),
(26, 'Winniw', '827ccb0eea8a706c4c34a16891f84e7b', '吳祥益', 2, '2023-06-27', '123@test.com', '0912445875', '屏東縣林邊鄉123', 1, '25.png', '2023-07-14 20:04:36', 1),
(27, 'Pooph', '827ccb0eea8a706c4c34a16891f84e7b', '邱瓈涵', 0, '2023-03-16', 'ph@test.com', '0954815487', '彰化縣二水鄉123', 1, 'ironman.jpg', '2023-07-14 20:22:16', 1),
(28, 'Cathy', '827ccb0eea8a706c4c34a16891f84e7b', '游筑閔', 2, '2018-06-17', 'cathy@test.com', '0919445820', '台中市西區仁愛路4段51號7樓', 1, 'avatar01.jpg', '2023-07-19 11:27:54', 1),
(29, 'Ruby', 'd41d8cd98f00b204e9800998ecf8427e', '孟倩如', 0, '1999-11-21', 'ruby@test.com', '0988124498', '新竹市東區新光路85號7樓', 1, 'avatar01.jpg', '2023-07-20 10:57:48', 1),
(30, 'Tim', 'd41d8cd98f00b204e9800998ecf8427e', '許廷佑', 0, '2014-01-14', 'tim@test.com', '0937698003', '台中市西區銘傳路1段42號2樓', 1, 'avatar01.jpg', '2023-07-20 10:57:54', 1),
(31, 'John', '827ccb0eea8a706c4c34a16891f84e7b', '李小強', 1, '1998-04-24', 'john@test.com', '0912440325', '台南市安平區沿海路42巷7弄329號', 1, 'avatar01.jpg', '2023-07-20 11:11:04', 1),
(32, 'Sam', '827ccb0eea8a706c4c34a16891f84e7b', '游小花', 2, '2018-06-11', 'sam@test.com', '0913520895', '台北市信義區中和路56號', 1, 'avatar01.jpg', '2023-07-20 11:26:38', 1),
(33, 'Sam', '827ccb0eea8a706c4c34a16891f84e7b', '12345', 1, '2023-07-01', 'k7892002@gmail.com', '0629569155', '宜蘭縣蘇澳鎮123', 1, 'avatar01.jpg', '2023-07-20 11:35:53', 1),
(34, 'Ana', '827ccb0eea8a706c4c34a16891f84e7b', '林小安', 2, '2023-07-07', 'ana@test.com', '0913854962', '宜蘭縣宜蘭市蘭陽路50號', 1, 'avatar01.jpg', '2023-07-20 11:58:57', 0),
(35, 'Katie', '827ccb0eea8a706c4c34a16891f84e7b', '王曉明', 1, '2023-07-06', 'katie@test.com', '0921116854', '台北市士林區123', 1, 'avatar01.jpg', '2023-07-20 15:23:39', 1);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `member`
--
ALTER TABLE `member`
  MODIFY `id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
