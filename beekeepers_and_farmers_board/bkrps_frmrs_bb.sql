-- MySQL dump 10.13  Distrib 8.0.23, for Linux (x86_64)
--
-- Host: localhost    Database: bkrps_frmrs_bb
-- ------------------------------------------------------
-- Server version	8.0.23-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `authtokens`
--

DROP TABLE IF EXISTS `authtokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authtokens` (
  `token` varchar(100) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`token`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `authtokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authtokens`
--

LOCK TABLES `authtokens` WRITE;
/*!40000 ALTER TABLE `authtokens` DISABLE KEYS */;
INSERT INTO `authtokens` VALUES ('ee44a027c7662e1131890b3c8261c019462667e781386a81e47f0b84ebd0',13),('testtoken',15);
/*!40000 ALTER TABLE `authtokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `beekeepers`
--

DROP TABLE IF EXISTS `beekeepers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `beekeepers` (
  `user_id` int NOT NULL,
  `num_of_hives` int NOT NULL,
  KEY `user_id` (`user_id`),
  CONSTRAINT `beekeepers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `beekeepers`
--

LOCK TABLES `beekeepers` WRITE;
/*!40000 ALTER TABLE `beekeepers` DISABLE KEYS */;
INSERT INTO `beekeepers` VALUES (13,14),(16,34),(18,28),(23,24),(25,35);
/*!40000 ALTER TABLE `beekeepers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bkprs_suggestions`
--

DROP TABLE IF EXISTS `bkprs_suggestions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bkprs_suggestions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tender_id` int NOT NULL,
  `beekeeper_id` int NOT NULL,
  `status` enum('admited','relevant','denied') NOT NULL DEFAULT 'relevant',
  PRIMARY KEY (`id`),
  KEY `tender_id` (`tender_id`),
  KEY `beekeeper_id` (`beekeeper_id`),
  CONSTRAINT `bkprs_suggestions_ibfk_1` FOREIGN KEY (`tender_id`) REFERENCES `tenders` (`id`),
  CONSTRAINT `bkprs_suggestions_ibfk_2` FOREIGN KEY (`beekeeper_id`) REFERENCES `beekeepers` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bkprs_suggestions`
--

LOCK TABLES `bkprs_suggestions` WRITE;
/*!40000 ALTER TABLE `bkprs_suggestions` DISABLE KEYS */;
INSERT INTO `bkprs_suggestions` VALUES (18,5,13,'admited'),(19,7,13,'admited'),(20,5,25,'relevant'),(21,7,25,'relevant'),(23,10,13,'denied'),(24,11,13,'admited');
/*!40000 ALTER TABLE `bkprs_suggestions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `farmers`
--

DROP TABLE IF EXISTS `farmers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `farmers` (
  `user_id` int NOT NULL,
  KEY `user_id` (`user_id`),
  CONSTRAINT `farmers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `farmers`
--

LOCK TABLES `farmers` WRITE;
/*!40000 ALTER TABLE `farmers` DISABLE KEYS */;
INSERT INTO `farmers` VALUES (14),(15),(17),(19),(20),(21),(22),(24);
/*!40000 ALTER TABLE `farmers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tenders`
--

DROP TABLE IF EXISTS `tenders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tenders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `farmer_id` int NOT NULL,
  `required_num_of_hives` int NOT NULL,
  `beekeeper_winner_id` int DEFAULT NULL,
  `salary` int NOT NULL,
  `status` enum('relevant','not_relevant') NOT NULL DEFAULT 'relevant',
  PRIMARY KEY (`id`),
  KEY `farmer_id` (`farmer_id`),
  KEY `beekeeper_winner_id` (`beekeeper_winner_id`),
  CONSTRAINT `tenders_ibfk_1` FOREIGN KEY (`farmer_id`) REFERENCES `farmers` (`user_id`),
  CONSTRAINT `tenders_ibfk_2` FOREIGN KEY (`beekeeper_winner_id`) REFERENCES `beekeepers` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tenders`
--

LOCK TABLES `tenders` WRITE;
/*!40000 ALTER TABLE `tenders` DISABLE KEYS */;
INSERT INTO `tenders` VALUES (5,22,12,13,454,'not_relevant'),(7,22,5,13,2000,'not_relevant'),(10,22,12,NULL,340,'relevant'),(11,22,14,13,470,'not_relevant');
/*!40000 ALTER TABLE `tenders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(25) NOT NULL,
  `email` varchar(320) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (13,'postman','postman@post.ru','BF3et/Yxt3FIhpjIKdupf4kiLd92Tfx9RRwPVlOQOrQ='),(14,'postman2','postman2@post.ru','ZAHlNceaRbFVCNqs0sgc93zmGF89fK4aIckNmzOc+ks='),(15,'postmanFarmer1','postmanFarm1@post.ru','DcGPMhn9WmOvqOFGaozE5GtnzlJakMwQsIuWwJLm6Nw='),(16,'postmanbeekeeper1','postmanbeekeeper1@post.ru','DcGPMhn9WmOvqOFGaozE5GtnzlJakMwQsIuWwJLm6Nw='),(17,'testing','testing@test.ru','Vslo8Topv3w62yzlZKWWyvl3yQALfiR5TucpzObsc9g='),(18,'elvis','elvisisaev@mail.ru','dcfX4qTJ5vPMs/xVDtOP9Cbp81pDxSIkl1mmOUIYmwY='),(19,'kevnkjsef','jfsdkf','n4bQgYhMfWWaL+qgxVrQFaO/TxsrC4Is0V1sFbDwCgg='),(20,'gf','df','MsIgSCxoQT+/gpDjseSbCoWQHPzWKrBzh2BWiipuilc='),(21,'dfhdf','sdf','GO4kFQ3LHZZ1Kk1t0PIN/Yuow4Un5AqoUJt63s94+cY='),(22,'testsignin','testsignin@test.ru','tBvWIAzPCtf5u6ze3pMY02vO9b4CsbgsJpN3SY4Iafk='),(23,'testaxios','testaxios@test.ru','d/5PJONMug7W7jHSUFBFr5EJTytfBaXQ4goc5mHu52c='),(24,'test','test','n4bQgYhMfWWaL+qgxVrQFaO/TxsrC4Is0V1sFbDwCgg='),(25,'beekeeperOne','beekeeperOne@test.ru','pAnyrRkuk2dTtqsHWAQ5VaguptOTY7mL+c33rYH6UPY=');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-10 19:56:18
