CREATE DATABASE `dasernet`;

USE `dasernet`;
--
-- Table structure for table `buyer_payment`
--

DROP TABLE IF EXISTS `buyer_payment`;
CREATE TABLE `buyer_payment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `buyer_id` int(11) NOT NULL,
  `service_request_id` int(11) NOT NULL,
  `stripe_customer_id` varchar(100) NOT NULL,
  `stripe_card_token_number` varchar(100) DEFAULT NULL,
  `card_type` varchar(12) NOT NULL,
  `card_last_digit` int(4) NOT NULL,
  PRIMARY KEY (`id`)
) ;

--
-- Table structure for table `disclosures`
--

DROP TABLE IF EXISTS `disclosures`;
CREATE TABLE `disclosures` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `disclosure_text` text,
  PRIMARY KEY (`id`)
);

--
-- Dumping data for table `disclosures`
--
INSERT INTO `disclosures` VALUES (1,'Disclosers\r\nTerms and conditions\r\n');
--
-- Table structure for table `helps`
--

DROP TABLE IF EXISTS `helps`;
CREATE TABLE `helps` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `signer_type` enum('Buyer','Seller') DEFAULT NULL,
  `subject` varchar(100) DEFAULT NULL,
  `description` text,
  `created_on` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
);

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
CREATE TABLE `notifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `buyer_user_id` int(11) DEFAULT NULL,
  `seller_user_id` int(11) DEFAULT NULL,
  `request_id` int(11) DEFAULT NULL,
  `service_request_id` int(11) DEFAULT NULL,
  `accept_status` char(1) DEFAULT 'P',
  `accepted_on` datetime DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ;

--
-- Table structure for table `organisations`
--

DROP TABLE IF EXISTS `organisations`;
CREATE TABLE `organisations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT 'Individual',
  PRIMARY KEY (`id`)
) ;

--
-- Table structure for table `screenlabels`
--

DROP TABLE IF EXISTS `screenlabels`;
CREATE TABLE `screenlabels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `org_id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(100) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ;

--
-- Table structure for table `seller_payment`
--

DROP TABLE IF EXISTS `seller_payment`;
CREATE TABLE `seller_payment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `seller_id` int(11) NOT NULL,
  `service_type_id` int(11) NOT NULL,
  `stripe_customer_id` varchar(100) NOT NULL,
  `stripe_card_token_number` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ;

--
-- Table structure for table `seller_service_details`
--

DROP TABLE IF EXISTS `seller_service_details`;
CREATE TABLE `seller_service_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `service_type_id` int(11) NOT NULL,
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
);

--
-- Table structure for table `service_request_address`
--

DROP TABLE IF EXISTS `service_request_address`;
CREATE TABLE `service_request_address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `address_line1` varchar(200) DEFAULT NULL,
  `address_line2` varchar(200) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(60) DEFAULT NULL,
  `zip` varchar(10) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

--
-- Table structure for table `service_request_params`
--

DROP TABLE IF EXISTS `service_request_params`;
CREATE TABLE `service_request_params` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `service_request_id` int(11) NOT NULL,
  `service_type_id` int(11) NOT NULL,
  `servicetype_param_id` int(11) NOT NULL,
  `servicetype_param_value` text,
  `servicetype_param_amount` float(8,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
);


--
-- Dumping data for table `service_request_params`
--

INSERT INTO `service_request_params` VALUES (1,5,1,2,'11',100.00),(2,6,1,2,'11',100.00),(3,1,1,2,'11',100.00);

--
-- Table structure for table `service_request_paymentlog`
--

DROP TABLE IF EXISTS `service_request_paymentlog`;
CREATE TABLE `service_request_paymentlog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `buyer_payment_seq_number` int(11) NOT NULL,
  `seller_payment_seq_number` int(11) NOT NULL,
  `buyer_charged_date` datetime DEFAULT NULL,
  `seller_paid_date` datetime DEFAULT NULL,
  `buyer_payment_status` varchar(100) DEFAULT NULL,
  `seller_payment_status` varchar(100) DEFAULT NULL,
  `remarks` text,
  PRIMARY KEY (`id`)
) ;

--
-- Table structure for table `service_requests`
--

DROP TABLE IF EXISTS `service_requests`;
CREATE TABLE `service_requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `service_type_id` int(11) NOT NULL,
  `date_of_service` date DEFAULT NULL,
  `needed_asap` enum('Y','N') DEFAULT 'N',
  `disclosures_checked` enum('Y','N') DEFAULT 'N',
  `service_request_address_id` int(11) DEFAULT NULL,
  `seller_user_id` int(11) DEFAULT NULL,
  `service_amount` float(8,2) DEFAULT NULL,
  `status` enum('P','C','I') DEFAULT 'P',
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
);

--
-- Table structure for table `servicetype_params`
--

DROP TABLE IF EXISTS `servicetype_params`;


CREATE TABLE `servicetype_params` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `service_type_id` int(11) NOT NULL,
  `description` text,
  `datatype` enum('Number','Radio','Checkbox') DEFAULT NULL,
  `rate` float(8,2) DEFAULT '0.00',
  PRIMARY KEY (`id`)
);


--
-- Dumping data for table `servicetype_params`
--

INSERT INTO `servicetype_params` VALUES (1,1,'# of rooms','Number',10.00),(2,2,'# of ddddd','Number',20.00),(3,3,'# of floors','Number',30.00),(4,1,'# of bb','Number',12.00);

--
-- Table structure for table `servicetypes`
--

DROP TABLE IF EXISTS `servicetypes`;
CREATE TABLE `servicetypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` text,
  `formula` varchar(200) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
);


--
-- Dumping data for table `servicetypes`
--
INSERT INTO `servicetypes` VALUES (1,'Floor Cleaning','10','0000-00-00 00:00:00','0000-00-00 00:00:00'),(2,'Floor Cleaning','10','2017-07-23 22:02:02','2017-07-23 22:02:02'),(3,'WhiteWash','10','2017-07-23 22:02:02','2017-07-23 22:02:02');

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;


CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phonenumber` bigint(11) DEFAULT NULL,
  `signer_type` enum('Buyer','Seller') DEFAULT NULL,
  `first_name` varchar(20) DEFAULT NULL,
  `last_name` varchar(20) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `emailaddress` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `stripe_customer_id` varchar(100) DEFAULT NULL,
  `org_id` int(11) DEFAULT '0',
  `address_id` int(11) DEFAULT '0',
  `profilephoto` varchar(100) DEFAULT NULL,
  `background_checked` enum('Y','N') DEFAULT 'N',
  `active` enum('Y','N') DEFAULT 'N',
  `verified` enum('Y','N') DEFAULT 'N',
  `vericode` varchar(20) NOT NULL,
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
);
