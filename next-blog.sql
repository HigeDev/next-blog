-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 02, 2025 at 03:16 AM
-- Server version: 8.0.30
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `next-blog`
--

-- --------------------------------------------------------

--
-- Table structure for table `inbox`
--

CREATE TABLE `inbox` (
  `id` int NOT NULL,
  `userId` int NOT NULL,
  `subject` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'no subject',
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `inbox`
--

INSERT INTO `inbox` (`id`, `userId`, `subject`, `message`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'test', 'I’m currently looking for new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I’ll try my best to get back to you!', '2025-05-31 14:45:43.217', '2025-05-31 14:45:43.217');

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `id` int NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'DefaultImage.png',
  `category` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'uncategorized',
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`id`, `content`, `title`, `image`, `category`, `slug`, `userId`, `createdAt`, `updatedAt`) VALUES
(1, '<p>lalaaaaa ada</p>', 'post 1', '1748833110334-Franky-1.jpg', 'Stock', 'post-1', 1, '2025-06-02 02:58:30.345', '2025-06-02 02:58:30.345');

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `id` int NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `linkUrl` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'https:/higesan.store',
  `userId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`id`, `name`, `slug`, `description`, `linkUrl`, `userId`, `createdAt`, `updatedAt`) VALUES
(1, 'projek 1', 'projek-1', 'swdcdavf waefcas', 'ladk.com', 1, '2025-05-31 14:58:15.360', '2025-05-31 14:58:15.360');

-- --------------------------------------------------------

--
-- Table structure for table `project_image`
--

CREATE TABLE `project_image` (
  `id` int NOT NULL,
  `projectId` int NOT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'DefaultImage.png',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `project_image`
--

INSERT INTO `project_image` (`id`, `projectId`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 1, '1748703495363-Sejarah_Nika_Elbaf.webp', '2025-05-31 14:58:15.375', '2025-05-31 14:58:15.375'),
(2, 1, '1748703495379-ab67616d00001e029d8163e3a3230cbcd8fbfb21.jpg', '2025-05-31 14:58:15.390', '2025-05-31 14:58:15.390'),
(3, 1, '1748703495395-Franky-1.jpg', '2025-05-31 14:58:15.405', '2025-05-31 14:58:15.405'),
(4, 1, '1748703495409-1748404925712-luffy_169.webp', '2025-05-31 14:58:15.418', '2025-05-31 14:58:15.418'),
(5, 1, '1748703495421-1748092037714-13842573087108185857.webp', '2025-05-31 14:58:15.434', '2025-05-31 14:58:15.434'),
(6, 1, '1748703495439-568de2278781c6bfd4563f1d1927f201.jpg_720x720q80.jpg', '2025-05-31 14:58:15.448', '2025-05-31 14:58:15.448'),
(7, 1, '1748703495451-FBSBI04207K-04A-A.jpg', '2025-05-31 14:58:15.460', '2025-05-31 14:58:15.460');

-- --------------------------------------------------------

--
-- Table structure for table `project_skill`
--

CREATE TABLE `project_skill` (
  `id` int NOT NULL,
  `projectId` int NOT NULL,
  `codeigniter` tinyint(1) NOT NULL DEFAULT '0',
  `laravel` tinyint(1) NOT NULL DEFAULT '0',
  `mysql` tinyint(1) NOT NULL DEFAULT '0',
  `prisma` tinyint(1) NOT NULL DEFAULT '0',
  `typescript` tinyint(1) NOT NULL DEFAULT '0',
  `javascript` tinyint(1) NOT NULL DEFAULT '0',
  `tailwind` tinyint(1) NOT NULL DEFAULT '0',
  `bootstrap` tinyint(1) NOT NULL DEFAULT '0',
  `api` tinyint(1) NOT NULL DEFAULT '0',
  `nextjs` tinyint(1) NOT NULL DEFAULT '0',
  `seo` tinyint(1) NOT NULL DEFAULT '0',
  `flowbite` tinyint(1) NOT NULL DEFAULT '0',
  `figma` tinyint(1) NOT NULL DEFAULT '0',
  `matlab` tinyint(1) NOT NULL DEFAULT '0',
  `arduino` tinyint(1) NOT NULL DEFAULT '0',
  `rstudio` tinyint(1) NOT NULL DEFAULT '0',
  `java` tinyint(1) NOT NULL DEFAULT '0',
  `androidstudio` tinyint(1) NOT NULL DEFAULT '0',
  `vscode` tinyint(1) NOT NULL DEFAULT '0',
  `git` tinyint(1) NOT NULL DEFAULT '0',
  `cisco` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `docker` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `project_skill`
--

INSERT INTO `project_skill` (`id`, `projectId`, `codeigniter`, `laravel`, `mysql`, `prisma`, `typescript`, `javascript`, `tailwind`, `bootstrap`, `api`, `nextjs`, `seo`, `flowbite`, `figma`, `matlab`, `arduino`, `rstudio`, `java`, `androidstudio`, `vscode`, `git`, `cisco`, `createdAt`, `updatedAt`, `docker`) VALUES
(1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, '2025-05-31 14:58:15.464', '2025-05-31 14:58:15.464', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstName` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastName` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profilePicture` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clerkUserId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `firstName`, `lastName`, `username`, `profilePicture`, `clerkUserId`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
(1, 'agfid6661@gmail.com', '•髭ーさん•', 'Pak Hige', 'admin', 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yeHJpZk55R0g4cGJiZktuc1M2bGNyMEN4VEQifQ', 'user_2xrifPDHJSW780fjJCemm6fsoh0', 1, '2025-05-31 14:44:55.458', '2025-05-31 14:45:27.008');

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('2a0804c7-b008-43dd-b03b-e611d929f726', '6656b7078f39a28fa0fd3debdc3509aa2da87c45064112b00de091f67e2ffef8', '2025-05-31 14:43:56.677', '20250524130356_init', NULL, NULL, '2025-05-31 14:43:56.494', 1),
('8a45bf68-9b8d-444e-b237-71684c8bf6bb', '838f07d8e9adbcca517d45b0a8ede6b86e3a4451831f78bb64d15d5fc1d764e5', '2025-05-31 14:43:56.747', '20250531142345_init', NULL, NULL, '2025-05-31 14:43:56.678', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `inbox`
--
ALTER TABLE `inbox`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Inbox_userId_fkey` (`userId`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Post_title_key` (`title`),
  ADD UNIQUE KEY `Post_slug_key` (`slug`),
  ADD KEY `Post_userId_fkey` (`userId`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Project_name_key` (`name`),
  ADD UNIQUE KEY `Project_slug_key` (`slug`),
  ADD KEY `Project_userId_fkey` (`userId`);

--
-- Indexes for table `project_image`
--
ALTER TABLE `project_image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Project_Image_projectId_fkey` (`projectId`);

--
-- Indexes for table `project_skill`
--
ALTER TABLE `project_skill`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Project_Skill_projectId_key` (`projectId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`),
  ADD UNIQUE KEY `User_clerkUserId_key` (`clerkUserId`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `inbox`
--
ALTER TABLE `inbox`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `project_image`
--
ALTER TABLE `project_image`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `project_skill`
--
ALTER TABLE `project_skill`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `inbox`
--
ALTER TABLE `inbox`
  ADD CONSTRAINT `Inbox_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `Post_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `Project_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `project_image`
--
ALTER TABLE `project_image`
  ADD CONSTRAINT `Project_Image_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `project_skill`
--
ALTER TABLE `project_skill`
  ADD CONSTRAINT `Project_Skill_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
