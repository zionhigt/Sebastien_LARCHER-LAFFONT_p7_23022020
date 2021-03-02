-- MariaDB dump 10.17  Distrib 10.4.15-MariaDB, for Linux (x86_64)
--
-- Host: mysql.hostinger.ro    Database: u574849695_19
-- ------------------------------------------------------
-- Server version	10.4.15-MariaDB-cll-lve

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Comments`
--

DROP TABLE IF EXISTS `Comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Comments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `comment_text` varchar(255) NOT NULL,
  `likes` varchar(255) DEFAULT '[]',
  `dislikes` varchar(255) DEFAULT '[]',
  `post_id` int(10) unsigned NOT NULL,
  `profil_id` int(10) unsigned DEFAULT NULL,
  `comment_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_post_id` (`post_id`),
  KEY `fk_comment_profil_id` (`profil_id`),
  CONSTRAINT `fk_comment_profil_id` FOREIGN KEY (`profil_id`) REFERENCES `Profils` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_post_id` FOREIGN KEY (`post_id`) REFERENCES `Posts` (`id`)
  ON DELETE CASCADE
  ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comments`
--

LOCK TABLES `Comments` WRITE;
/*!40000 ALTER TABLE `Comments` DISABLE KEYS */;
INSERT INTO `Comments` VALUES (1,'Sint ullam laboriosam ullam impedit atque qui. Illo iure nulla possimus odit dolor itaque. Dolor et aut dignissimos consequuntur dicta. Minus aliquid quam doloremque est delectus ea in.','a','c',1,1,'1970-06-24 05:21:12'),(2,'Et quam quod numquam maiores iusto sint vel suscipit. Maxime ut deleniti quis quod quisquam incidunt hic consequatur. Magni neque omnis ipsa vitae aliquid hic nulla. Sequi aperiam aspernatur ab consequatur quasi.','b','c',2,2,'1987-09-28 10:00:21'),(3,'Adipisci est placeat nesciunt error. Voluptatum soluta voluptas nulla consectetur nostrum numquam nobis. Incidunt ea pariatur quibusdam earum.','a','b',3,3,'2015-03-22 05:40:44'),(4,'Autem voluptatem officia id voluptate fugit nulla earum. Deserunt esse consequatur quia nemo saepe. Quos tenetur consequatur ea itaque. Et voluptatem error nulla sit et provident.','b','a',4,4,'1973-03-31 07:26:55'),(5,'Nulla non explicabo voluptatem non voluptate minus sed. Omnis optio ut ut eum autem repellat libero. Id illum a vitae numquam. Qui sed vero minus dolorem animi et et impedit.','c','c',5,5,'1978-12-13 22:08:22'),(6,'Magni distinctio non voluptas laboriosam unde accusantium. A quia fuga eos consequatur illum libero. Soluta veritatis repellendus quasi illo error aliquam. Eum quia reprehenderit ex itaque ut accusantium.','c','c',6,6,'1972-02-16 01:31:23'),(7,'Cumque placeat qui vero molestias. Dolorem sed saepe pariatur vel. Ea laboriosam inventore eum in.','b','c',7,7,'2003-05-05 00:23:41'),(8,'Est eum eos tenetur quae porro quae voluptates. Eum voluptatem porro non qui consequatur.','c','a',8,8,'2011-12-23 14:23:52'),(9,'Rem aut ut eum quaerat repellat eligendi. Deleniti voluptas ex quasi recusandae mollitia aut iusto quae. Incidunt debitis quibusdam numquam dolores quia natus ut. Consectetur est optio sequi facere.','b','a',9,9,'1974-01-12 17:44:19'),(10,'Ipsum et corrupti eaque sit ab numquam et. Aut ea et quia assumenda repellat quia. Quam sit in qui consequuntur natus voluptatibus sapiente. Reprehenderit perferendis ducimus dolore id eaque debitis. Rerum est ratione quia eligendi eum.','b','a',10,10,'1991-12-12 11:31:50'),(11,'Ea repellat quas quia magnam delectus quidem in. Id ea officia quo. Necessitatibus aspernatur id harum et maiores quas ut.','a','a',11,11,'1983-06-29 02:35:27'),(12,'Quia voluptatem est ut et ea. A fugit et ut modi asperiores ratione maxime soluta. Illum similique accusantium dolor modi. Aperiam culpa omnis doloribus ut ut.','c','c',12,12,'1983-06-17 04:25:45'),(13,'Vitae optio repudiandae quas praesentium pariatur. Fugiat velit recusandae modi rem et quas. Laboriosam aut non dolorem consequatur impedit et ipsum commodi.','a','a',13,13,'1980-03-10 01:47:40'),(14,'Molestiae quia quia corrupti. Quis temporibus occaecati rerum sint. Officiis qui sed odio quisquam eveniet. Autem odit est repellendus quasi molestias perferendis.','a','b',14,14,'1982-01-11 10:50:16'),(15,'Fuga ullam quia nemo. Eum delectus in dolor inventore. Dolor quia ipsum est autem quae modi sit.','c','a',15,15,'2002-02-19 17:04:10'),(16,'Saepe ut occaecati vitae necessitatibus asperiores omnis soluta voluptas. Esse veritatis rem cum deserunt unde. Tempora perspiciatis est ea est possimus hic. Tempore et enim sit autem sed enim illo. Maiores provident dolorem architecto esse pariatur totam','a','c',16,16,'2018-08-30 17:08:15'),(17,'Libero libero voluptas error. Ipsam fugit quia praesentium. Sunt et dolor earum vel beatae placeat. Tempora rerum ea vero dolor dignissimos consectetur consequatur.','b','a',17,17,'1982-08-15 17:42:56'),(18,'Optio sunt incidunt mollitia in labore voluptatibus. Rerum neque rerum repudiandae autem deleniti animi. Quas excepturi perferendis quibusdam non. Beatae quidem vitae earum ratione id officiis.','b','c',18,18,'1989-06-16 06:41:32'),(19,'Fugit ratione quasi illum neque quibusdam illum. Facere quo officiis assumenda dolorum praesentium. Quaerat eius earum sunt qui et. Rerum non consequatur atque quia recusandae officiis.','c','b',19,19,'1987-08-03 22:45:32'),(20,'Dolores officia ratione quis dolores. Fuga vitae blanditiis labore eveniet vel. Ratione atque nostrum sunt aperiam quo occaecati consequatur.','c','c',20,20,'1995-05-15 07:44:48'),(21,'Aut cupiditate aut possimus. Amet molestiae nostrum alias. Assumenda et laudantium sit accusamus architecto.','c','c',21,1,'1988-07-14 12:03:21'),(22,'Neque cum asperiores deleniti eos et et. Deleniti odio asperiores voluptatum necessitatibus. Blanditiis iusto minima sint consequuntur iusto minus repellendus.','b','b',22,2,'1995-07-17 12:43:47'),(23,'In voluptatem consequuntur dolores sit possimus sed. Vel perspiciatis repellendus dicta ad dolorem ipsam quia. Repellat pariatur possimus ipsa est et tempore est.','a','a',23,3,'1972-10-25 23:03:04'),(24,'Nemo quos eos reiciendis at aut. Odio alias similique doloremque. Sequi magnam quia voluptatem iure eos suscipit totam.','b','b',24,4,'1974-01-11 10:58:54'),(25,'Qui velit dolores similique repudiandae ratione ut distinctio est. Dolore sit dolorem ut reprehenderit architecto delectus consequatur. Qui sed et perspiciatis doloribus laboriosam aut.','b','b',25,5,'1997-03-05 20:16:37'),(26,'Necessitatibus sit et explicabo dicta. Nesciunt sed dolorum corrupti et nostrum voluptate. Est illum quia dolor. Aut rerum cupiditate officia consequuntur id consequatur. Dicta et qui beatae illum fuga.','a','b',26,6,'1997-07-17 20:22:15'),(27,'Ut officia consectetur iste ad quidem minima. Error iure explicabo dignissimos praesentium corrupti sequi maxime. At veniam ut tempore nemo omnis voluptas iusto et.','c','c',27,7,'2005-01-03 22:46:14'),(28,'Cupiditate commodi est voluptatem tenetur. Aut culpa nulla voluptatem praesentium. Voluptatibus amet quia sed ut deleniti. Pariatur perferendis amet blanditiis nam recusandae natus. Amet aut voluptas nam tempore non porro maxime.','c','b',28,8,'1997-04-23 08:13:40'),(29,'Sed et perspiciatis est consequuntur in sed quis. Voluptates voluptatem architecto molestiae exercitationem mollitia dolore eum. Quisquam in deleniti repellendus et eius non.','b','b',29,9,'1985-10-31 14:17:11'),(30,'Rem blanditiis et accusantium adipisci. Expedita rerum cum aut voluptas eaque perspiciatis quia. Nam sunt sunt officiis. Cum sunt corporis voluptatem laborum.','c','b',30,10,'1971-08-06 14:28:26');
/*!40000 ALTER TABLE `Comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Posts`
--

DROP TABLE IF EXISTS `Posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Posts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(40) DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `media` varchar(40) DEFAULT NULL,
  `likes` varchar(255) DEFAULT '[]',
  `dislikes` varchar(255) DEFAULT '[]',
  `profil_id` int(10) unsigned DEFAULT NULL,
  `posted_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_post_profil_id` (`profil_id`),
  CONSTRAINT `fk_post_profil_id` FOREIGN KEY (`profil_id`) REFERENCES `Profils` (`id`)
  ON DELETE SET NULL
  ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Posts`
--

LOCK TABLES `Posts` WRITE;
/*!40000 ALTER TABLE `Posts` DISABLE KEYS */;
INSERT INTO `Posts` VALUES (1,'Consequuntur et inventore libero culpa s','Nesciunt omnis dolorem soluta delectus qui doloribus aut. Porro qui deserunt natus unde dolores magni. Vitae magnam ipsam molestiae nesciunt maxime molestias.','http://lorempixel.com/640/480/','b','b',1,'1989-11-11 19:41:29'),(2,'Aut ex suscipit tenetur iusto est vel.','Suscipit modi eos nihil officia maxime quam totam praesentium. Aut modi sit molestiae excepturi odit aut cupiditate dolor. Non recusandae quisquam omnis perspiciatis id cupiditate. Beatae doloribus corrupti ad quas.','http://lorempixel.com/640/480/','b','c',2,'1988-07-07 22:22:19'),(3,'Atque eveniet explicabo asperiores volup','Perspiciatis labore porro non nihil. Est eveniet molestiae quis omnis sint eos.','http://lorempixel.com/640/480/','b','a',3,'1992-09-26 21:54:12'),(4,'Amet aspernatur provident aliquid fuga p','Itaque voluptas maxime quae eligendi mollitia at. Reprehenderit magnam repellat hic. Tenetur quo ea omnis sint. Alias qui ut corrupti autem reprehenderit corporis et.','http://lorempixel.com/640/480/','c','b',4,'1980-01-29 06:31:38'),(5,'Eligendi ea beatae quidem odio.','Et ipsam eum placeat accusamus harum voluptatem. Accusantium sed placeat ducimus veniam. Et consequuntur non magnam enim aliquid est quod. Ipsum officiis cumque asperiores amet quaerat. Ipsa voluptas doloribus qui voluptatem.','http://lorempixel.com/640/480/','b','c',5,'1970-07-16 23:33:01'),(6,'Vel beatae est non.','Expedita optio qui illum veniam ut ut nihil. Minus sint ab illum eveniet amet. Dolorum et ab architecto fuga sit inventore omnis repudiandae.','http://lorempixel.com/640/480/','c','a',6,'1980-12-01 10:53:26'),(7,'Quis eos delectus suscipit molestiae pro','Distinctio quidem et cum alias error ut dolores natus. Voluptate autem sed blanditiis iste harum. Quo ut ullam esse quis dolorem minus voluptas.','http://lorempixel.com/640/480/','a','c',7,'1990-07-18 10:55:12'),(8,'Dolorem et nisi et voluptas et sed.','Ab maiores ea dolores aliquam nemo quia qui. Natus quidem facere delectus omnis. Consequatur vel velit et qui deleniti ipsum magni.','http://lorempixel.com/640/480/','b','b',8,'2003-08-08 14:39:52'),(9,'Dolorem vel rerum quae quidem esse volup','Fugit autem non quia et. Rerum aspernatur qui laborum aut amet. Quia reiciendis quos aut et totam quia.','http://lorempixel.com/640/480/','a','a',9,'2021-02-21 02:47:33'),(10,'Itaque cum quidem vero.','Eius rerum eum ea fugiat exercitationem. Nisi tempore reprehenderit quis. Vel aspernatur praesentium quaerat omnis iusto.','http://lorempixel.com/640/480/','a','a',10,'1993-04-28 12:36:11'),(11,'Quibusdam non aspernatur impedit veniam ','Laborum rerum culpa excepturi est deserunt porro. Velit laborum eaque repellat ut adipisci. Dolores mollitia aliquam adipisci molestiae odio.','http://lorempixel.com/640/480/','b','a',11,'1971-02-10 02:59:25'),(12,'Esse temporibus quo voluptatibus sequi.','Amet veniam necessitatibus ad facere assumenda repudiandae et. At exercitationem dicta necessitatibus voluptatum rem laudantium vero. Sed aut quia alias consequatur et fuga minus odit. Voluptates pariatur fugiat harum qui quam sed.','http://lorempixel.com/640/480/','b','b',12,'1980-01-10 18:41:31'),(13,'Quibusdam ad tempore recusandae eum.','Soluta tempora qui consequuntur tempore minima. Ex id totam eius voluptas quae et. Qui mollitia id perspiciatis provident voluptas sit.','http://lorempixel.com/640/480/','c','c',13,'2008-09-16 09:50:28'),(14,'Eos totam voluptas qui fugit tempore lau','Provident aliquid ea dicta quo. Qui velit quo ex atque quas. Et tenetur voluptatum et et in. Quia necessitatibus praesentium sunt dolore amet sit.','http://lorempixel.com/640/480/','a','c',14,'2019-02-10 16:17:16'),(15,'Pariatur ex reiciendis nulla deserunt.','Saepe totam nostrum ullam. Tempore aspernatur sed maxime minus. Architecto adipisci illo quo eveniet nisi velit. Autem et nihil amet et magnam.','http://lorempixel.com/640/480/','c','c',15,'1996-01-05 13:23:39'),(16,'Sed enim quia sint est dicta officia.','Sunt assumenda ipsum cupiditate fuga deleniti est corrupti. Tenetur doloribus eum velit ut minima vitae. Consequuntur id incidunt et excepturi quia. Qui et accusantium ipsa sed.','http://lorempixel.com/640/480/','c','b',16,'1983-02-17 23:57:14'),(17,'Aliquid quisquam rerum aut officiis.','Architecto repudiandae aut eaque qui. Ut voluptas earum voluptatum velit sed dignissimos. Iure est laboriosam quia temporibus minima.','http://lorempixel.com/640/480/','a','a',17,'1972-11-09 00:59:23'),(18,'Dicta impedit esse non neque accusamus.','Cum eos nihil voluptatum commodi delectus amet. Dicta numquam id eos rerum. Maiores et est minus quos. Distinctio ipsa reiciendis sint cupiditate recusandae.','http://lorempixel.com/640/480/','b','a',18,'2004-09-23 16:26:07'),(19,'Laboriosam laborum veniam animi et ea ea','Non corporis esse nisi minus minus aut. Rerum facilis molestiae illum est iure nemo quia. Eos quo aliquam voluptatem veniam in aut.','http://lorempixel.com/640/480/','b','b',19,'1997-02-11 11:07:49'),(20,'Dolorum at et iusto recusandae aperiam m','Quod deserunt eos corrupti tenetur velit dignissimos qui dolore. Doloribus pariatur et eaque nam quibusdam rerum aut pariatur. Incidunt fugiat est vitae.','http://lorempixel.com/640/480/','b','c',20,'1997-10-21 19:21:23'),(21,'Sint ducimus quis voluptas fugit qui.','Voluptatem aut voluptate illo tempora quaerat dolores cumque. Eos aliquid laudantium at ea quaerat animi. Placeat facilis consectetur delectus eaque delectus.','http://lorempixel.com/640/480/','b','a',1,'2007-07-30 03:02:03'),(22,'Inventore fugiat eligendi recusandae qui','Eius repellendus voluptates maiores incidunt. Vel mollitia nemo quis recusandae. Autem qui similique saepe ipsum architecto amet. Aliquid perferendis quia laborum sint aut quidem.','http://lorempixel.com/640/480/','c','c',2,'2006-10-14 13:47:47'),(23,'Maiores a iste voluptatem sunt sequi.','Non animi placeat accusamus dicta dolor tempora. Et minima quo repellendus esse qui ut qui. Delectus exercitationem id cupiditate saepe nam.','http://lorempixel.com/640/480/','b','c',3,'1998-03-03 10:42:53'),(24,'Accusantium ea maxime eligendi exercitat','Aut consequatur laborum enim aut. Aliquam exercitationem excepturi repudiandae doloribus aut facere ut. Et et molestias eum dolores enim.','http://lorempixel.com/640/480/','c','b',4,'2004-01-30 04:05:21'),(25,'Sit voluptatem ea aut distinctio.','Aspernatur nobis ut voluptas ratione quo assumenda vitae neque. Illum asperiores dolores beatae adipisci hic dolores. Eligendi consequatur ipsum quia sed. Voluptatem laudantium veniam voluptatem ut aperiam nobis saepe. At ipsa doloremque esse quia sed acc','http://lorempixel.com/640/480/','a','c',5,'1989-05-13 23:27:29'),(26,'Et illum sed sint vitae.','Sed repellat et tempora inventore consequatur harum. Veniam unde reprehenderit doloremque ut. Eos et qui tempora voluptatem possimus sint quis.','http://lorempixel.com/640/480/','b','c',6,'2013-11-23 04:59:56'),(27,'Repellendus perspiciatis voluptas suscip','Et tenetur sint beatae nesciunt harum. Beatae facilis veritatis numquam est ad. Porro dicta optio sapiente molestiae facilis repudiandae est ut. Debitis odio occaecati aut molestiae.','http://lorempixel.com/640/480/','a','b',7,'1997-05-04 19:20:22'),(28,'Officia ea dolore accusamus aut.','Sapiente maxime esse corporis. Praesentium fugit asperiores necessitatibus porro nobis quia. Qui cum dolorem qui ad ad.','http://lorempixel.com/640/480/','c','a',8,'1981-08-15 02:44:58'),(29,'Voluptate sapiente impedit necessitatibu','Voluptas et provident asperiores nisi autem sunt suscipit earum. Saepe enim aut quia harum voluptas fuga amet corrupti. Qui et illum quam iste rerum.','http://lorempixel.com/640/480/','b','c',9,'2007-06-09 14:28:42'),(30,'Et velit laboriosam sed nesciunt quaerat','Qui iste sed deleniti saepe necessitatibus. Sed molestiae aut eum voluptate incidunt laborum cumque. Id inventore aliquam maxime molestiae. Iste eos qui et et quibusdam velit.','http://lorempixel.com/640/480/','a','a',10,'2013-11-04 14:04:11'),(31,'Itaque culpa eum dolorem sed repudiandae','Vel voluptates qui debitis libero et nesciunt et. Commodi voluptas optio aliquam quia minima ratione voluptatem. Autem id in perspiciatis qui aut delectus excepturi.','http://lorempixel.com/640/480/','a','c',11,'2007-01-11 04:55:34'),(32,'Et et iure molestias.','Sit soluta maxime vel molestiae ad. Et animi sint vel nisi mollitia quae impedit. Aut dignissimos quo aut ad.','http://lorempixel.com/640/480/','b','a',12,'2012-03-12 14:09:15'),(33,'Veritatis iste sunt dolor laudantium.','Ut dolor enim consequatur autem itaque nihil. Voluptatum laboriosam nihil quod in cum ea sunt qui. Animi reprehenderit et reprehenderit rerum non velit.','http://lorempixel.com/640/480/','a','c',13,'2005-06-22 18:50:36'),(34,'Eum minima et sed quis explicabo error.','Numquam libero veniam vero quasi quidem consequatur. Sit repellendus atque veritatis nesciunt. Praesentium non harum laudantium illum ab ipsum. Fugiat aut dignissimos est exercitationem veritatis laborum.','http://lorempixel.com/640/480/','b','c',14,'2021-02-05 04:41:36'),(35,'Voluptas quia et sequi facere id assumen','Ad aliquid autem officiis vitae velit officiis dolor. Culpa optio dolor mollitia libero ipsa rerum omnis.','http://lorempixel.com/640/480/','c','a',15,'2020-04-01 06:03:37'),(36,'Eum aliquam ipsa doloribus porro aliquid','Odio iste ipsam autem molestiae. Nostrum ut voluptate quod similique. Non soluta et id fugiat eveniet autem. Soluta consequatur odit tempore quasi.','http://lorempixel.com/640/480/','c','b',16,'1988-09-08 02:21:03'),(37,'Aut est at corrupti fugiat repellendus a','Quae perferendis fuga fuga quibusdam quibusdam provident et. Sequi voluptate libero dolorem. Voluptas est aut quo cumque soluta quasi autem. Facilis laboriosam temporibus omnis omnis et.','http://lorempixel.com/640/480/','a','b',17,'1984-08-22 13:33:03'),(38,'In ut eveniet nemo non rerum ratione cum','Vel quasi reiciendis eaque et alias alias. Natus unde officiis ut aut qui ullam cum. Qui sapiente nobis molestias. Voluptatem at consequatur consequuntur illo. Autem consequatur est sed quia est eligendi id.','http://lorempixel.com/640/480/','a','a',18,'2011-12-30 22:31:23'),(39,'Recusandae omnis nisi adipisci sed.','Nostrum consequuntur beatae impedit illum veniam. Voluptatem corrupti cupiditate corporis itaque nesciunt. Eligendi culpa cum culpa minus.','http://lorempixel.com/640/480/','c','c',19,'1989-07-13 03:41:18'),(40,'Doloremque perspiciatis corrupti quo id ','Deserunt hic consectetur vel velit natus cumque. Sequi tempora temporibus voluptatem aliquid dolorum voluptas et minus. Et vel consequatur qui non magni quo dolorem praesentium.','http://lorempixel.com/640/480/','c','a',20,'2002-04-28 06:15:35'),(41,'Non at ut autem amet impedit ut eius rat','Impedit nesciunt eligendi aut laboriosam. Suscipit exercitationem dolore et suscipit in laboriosam. Quae ipsum similique dolores saepe quo ab. Facere deleniti dolorem nesciunt.','http://lorempixel.com/640/480/','a','a',1,'1978-04-22 05:35:57'),(42,'Sit voluptatem voluptatibus error vitae ','Cum quia perferendis enim tempore at iste in. Quod distinctio veniam pariatur voluptatum similique fugiat. Sit quis laborum voluptas quod blanditiis exercitationem laborum. Autem et dolore consequatur ipsum.','http://lorempixel.com/640/480/','b','a',2,'1993-06-01 09:30:00'),(43,'Aut tempora numquam occaecati fugit sit.','Reiciendis porro qui sapiente quae ut voluptatum error qui. Sint deleniti qui suscipit cumque. Culpa rem quos ad sit ea aut error. Cupiditate rerum culpa in molestiae quae rerum. Corrupti et recusandae necessitatibus distinctio.','http://lorempixel.com/640/480/','c','c',3,'1998-01-17 21:27:18'),(44,'At dolor consequatur mollitia occaecati.','Consequatur ut ipsam aut quisquam ea. Quod architecto adipisci omnis accusamus. Et iusto expedita minus iusto accusamus consectetur. Deleniti deleniti minima in.','http://lorempixel.com/640/480/','c','b',4,'1994-05-03 21:58:46'),(45,'Rerum quia ab iure cumque cupiditate vol','Pariatur accusantium et quisquam ab quae. Provident id aut necessitatibus ducimus distinctio incidunt. Quisquam quia ab vitae voluptas facilis. Expedita temporibus sint est et fuga rerum.','http://lorempixel.com/640/480/','c','b',5,'2009-06-05 09:26:20'),(46,'Maiores cupiditate quia in aut ut.','Labore itaque facilis doloribus quis. Dolorem odio est quia ab voluptatem ipsum. Vel minima earum doloribus officiis. Maiores asperiores vitae eaque sint eum harum.','http://lorempixel.com/640/480/','a','c',6,'1989-11-12 23:13:47'),(47,'Perferendis et error maxime laudantium t','Id rem deleniti maxime eum est qui. Commodi dolores deserunt quas et. Quis soluta nam consequatur iste quaerat. Animi dolorum dignissimos deleniti eos aut. Et molestiae et occaecati.','http://lorempixel.com/640/480/','a','a',7,'2009-08-24 16:12:04'),(48,'Facilis perspiciatis minima molestiae.','Cupiditate maxime dolores voluptatem iste beatae. Veniam aut voluptatem fuga accusantium et voluptas. Qui laborum perspiciatis quia aut. Eius saepe laborum fugit et hic eum.','http://lorempixel.com/640/480/','c','c',8,'2002-08-05 14:08:39'),(49,'Aut nesciunt ad et.','Nihil eos beatae eos odio quibusdam recusandae ullam dolores. Nulla magni id non distinctio soluta architecto. Cum atque ducimus itaque ipsam quidem. Id voluptatem et doloribus dolores velit.','http://lorempixel.com/640/480/','a','c',9,'2015-07-20 12:28:15'),(50,'Saepe quis unde vel voluptas ab quod mol','Eos molestiae fugiat consequatur ratione hic qui sit. Molestiae commodi accusamus illo sed. Dicta consequatur quis animi exercitationem alias quisquam dolorum. Id dolores quo aut eos ratione.','http://lorempixel.com/640/480/','b','a',10,'1997-01-22 19:08:05');
/*!40000 ALTER TABLE `Posts` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `Posts` WRITE;
/*!40000 ALTER TABLE `Posts` DISABLE KEYS */;
UPDATE Posts SET likes='[]', dislikes='[]';
/*!40000 ALTER TABLE `Posts` ENABLE KEYS */;
UNLOCK TABLES;
--
-- Table structure for table `Profils`
--

DROP TABLE IF EXISTS `Profils`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Profils` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `firstName` varchar(40) NOT NULL,
  `lastName` varchar(40) NOT NULL,
  `picture` varchar(128),
  `friends` varchar(255) DEFAULT '[]',
  `user_id` int(10) unsigned NOT NULL,
  `created_date` datetime NOT NULL,
  `is_active` boolean NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `fk_user_id` (`user_id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`)
  ON DELETE CASCADE
  ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Profils`
--

LOCK TABLES `Profils` WRITE;
/*!40000 ALTER TABLE `Profils` DISABLE KEYS */;
INSERT INTO `Profils` VALUES (1,'Dale','Goyette','http://lorempixel.com/640/480/','a',1,'1999-03-03 19:23:41', 0),
(2,'Obie','Casper','http://lorempixel.com/640/480/','a',2,'1999-07-01 18:18:59', 0),
(3,'Brisa','Kessler','http://lorempixel.com/640/480/','c',3,'1994-03-21 14:06:16', 0),
(4,'Julian','Mertz','http://lorempixel.com/640/480/','a',4,'2010-09-27 20:05:37', 1),
(5,'Jed','Moore','http://lorempixel.com/640/480/','b',5,'2003-04-24 07:53:18', 0),
(6,'Eugenia','Reynolds','http://lorempixel.com/640/480/','c',6,'1973-07-22 20:39:43', 0),
(7,'Nayeli','Nienow','http://lorempixel.com/640/480/','c',7,'2009-06-15 22:23:19', 1),
(8,'Lamont','Waelchi','http://lorempixel.com/640/480/','b',8,'2012-06-17 19:19:24', 0),
(9,'Velva','Jenkins','http://lorempixel.com/640/480/','c',9,'2006-07-03 20:39:05', 1),
(10,'Nathen','Kihn','http://lorempixel.com/640/480/','a',10,'1998-06-30 22:51:15', 0),
(11,'Ola','Harvey','http://lorempixel.com/640/480/','a',11,'1976-06-23 11:30:33', 1),
(12,'Leland','Hegmann','http://lorempixel.com/640/480/','b',12,'2013-02-20 13:45:30', 0),
(13,'Beau','Champlin','http://lorempixel.com/640/480/','a',13,'1998-09-09 11:07:15', 0),
(14,'River','Hills','http://lorempixel.com/640/480/','b',14,'1980-11-03 01:07:20', 1),
(15,'Michael','Rowe','http://lorempixel.com/640/480/','b',15,'1996-04-12 09:43:58', 0),
(16,'Kailey','Brakus','http://lorempixel.com/640/480/','b',16,'1974-10-14 23:35:59', 1),
(17,'Julian','Terry','http://lorempixel.com/640/480/','c',17,'1997-04-06 13:15:41', 1),
(18,'Alvis','Stiedemann','http://lorempixel.com/640/480/','a',18,'1989-02-10 20:56:19', 0),
(19,'Wilhelmine','Gibson','http://lorempixel.com/640/480/','a',19,'2013-07-09 01:59:28', 0),
(20,'Helen','Schuster','http://lorempixel.com/640/480/','c',20,'2003-01-19 00:51:47', 1);
/*!40000 ALTER TABLE `Profils` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(40) NOT NULL,
  `password` varchar(40) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'praynor@example.com','781c31fa4c083061ee9f37a49583ad719fa30f33'),(2,'xwhite@example.net','8527c78ede2dc5cc37e9a28b5a7be12415a24b35'),(3,'xwunsch@example.com','35ccd4152144aeea73d2395d45eea279f9d26856'),(4,'ztremblay@example.net','005bb77e68db2e262ce3a317fd9861477ae94ef7'),(5,'santa.price@example.org','2c65e5d25088875d266476414c08718108772861'),(6,'fkuhlman@example.com','d3d24d82adca868d451c0ac24ee5c483c21cd8a5'),(7,'kyleigh17@example.org','317803e32af712421c60104a13c7c2eecfbc9c57'),(8,'america80@example.com','0c371568793df312853cc11bd8db1e26669578c6'),(9,'hahn.jewel@example.net','fdf91698925660468b4c7e8ed2c3dd5cb477cab8'),(10,'medhurst.myrtle@example.com','19b700e91de24af66b4d71a1033e013832ba21b0'),(11,'madie93@example.com','6d92566f65497e558ae1059065fd161abb31e93f'),(12,'maegan44@example.net','379b0765caac5d14a9d287c2045c981cf64a63ad'),(13,'ellsworth.mayert@example.com','1949eb0d85c59701f801efda8d34ba8b5c5b3def'),(14,'stiedemann.phyllis@example.org','94c35993da7c76a991e35042454d076f4875214a'),(15,'olueilwitz@example.org','9695adbccf9456a1f89dc78c4a977b73c922098c'),(16,'tiana.watsica@example.com','4c0038b9932cccfb5f9ec0954a7032d0c31bde98'),(17,'martine.satterfield@example.com','f369837ad5b1275bfa3637bdc844a1f83eaef813'),(18,'tamia.parker@example.net','028123858527804407e9919046584f68d7e93955'),(19,'horace.boyer@example.net','91edc8cd9c06ab7f9768a139d964042b220ff3f3'),(20,'yessenia64@example.com','01ad6dae6ebadda53c727eed2539ee7818acfb87'),(21,'bradtke.alberto@example.org','f9cdc55aa7118c9dd22bbf3202a66ccd922fabc4'),(22,'rosenbaum.cecil@example.org','fa238f748872eba47b6b47741b38d42535a4afae'),(23,'bertrand51@example.net','23d017ffe0d5b0bcf5518572e9291d9a74fe2f72'),(24,'nrunolfsson@example.net','32c48d917841a83a378d252cb97ddafa1c522cff'),(25,'vhettinger@example.net','fb015ef43a5098d181880ba8e86b3c60da91fa33'),(26,'rashawn98@example.net','ced24012ae6c16875f934efcf64e8617a62ab9b3'),(27,'dstrosin@example.com','b265260e6702fb0d16650ad915da02c630d34eb8'),(28,'xferry@example.com','375c57eba703858a4eef6a11583bc3d0f56fb565'),(29,'christian.kutch@example.net','9c1c21d12d757329c6acea8316533129e545c2d2'),(30,'powlowski.kasey@example.net','9861802a693d8e9e7da301a2efd0e0a15620b785');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-24 12:12:27
