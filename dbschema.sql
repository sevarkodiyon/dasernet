create database dasernet;
use dasernet;
create table servicetypes (
	id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	description text,
	formula varchar(200),	
	created_on datetime,
	modified_on datetime
);

create table servicetype_params (
	id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	service_type_id int(11) NOT NULL ,
	description varchar(200),
	options  varchar(200) NOT NULL,
	datatype enum('Number','Radio','Checkbox'),
	rate float(8,2) default 0	
);

ALTER TABLE servicetype_params ADD CONSTRAINT servicetypes_ibfk_1 FOREIGN KEY(service_type_id)  REFERENCES servicetypes(id);


create table users (
	id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	phonenumber int(11) ,
	signer_type enum('Buyer','Seller') ,
	first_name varchar(20),
	last_name varchar(20),
	dob date,
	emailaddress varchar(100) ,
	password varchar(100),
	stripe_customer_id varchar(100),
	org_id int(11) default 0,
	address_id int(11) default 0,
	profilephoto varchar(100),
	background_checked enum('Y','N') default 'N',
	active enum('Y','N') default 'N',
	verified  enum('Y','N') default 'N',
     vericode varchar(20) NOT NULL,
	created_on datetime,
	modified_on datetime
);


create table seller_service_details (
	id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	user_id int(11) NOT NULL,
	service_type_id int(11) NOT NULL, 	
	created_on datetime,
	modified_on datetime
);
ALTER TABLE seller_service_details ADD CONSTRAINT seller_service_details_ibfk_1 FOREIGN KEY(service_type_id)  REFERENCES servicetypes(id);
ALTER TABLE seller_service_details ADD CONSTRAINT users_ibfk_1 FOREIGN KEY(user_id)  REFERENCES users(id);


create table service_requests (
	id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	user_id int(11) NOT NULL,
	service_type_id int(11) NOT NULL, 	
	date_of_service date,
	needed_asap  enum('Y','N') default 'N',
	disclosures_checked  enum('Y','N') default 'N',
	service_request_address_id int(11),
	seller_user_id int(11),
	service_amount float(8,2),
	status  enum('P','C','I') default 'P',
	created_on datetime,
	modified_on datetime
);

ALTER TABLE service_requests ADD CONSTRAINT seller_service_details_ibfk_2 FOREIGN KEY(service_type_id)  REFERENCES servicetypes(id);
ALTER TABLE service_requests ADD CONSTRAINT users_ibfk_2 FOREIGN KEY(user_id)  REFERENCES users(id);



create table service_request_params (
	id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	service_request_id int(11) NOT NULL,
	service_type_id int(11) NOT NULL,
	servicetype_param_id int(11) NOT NULL, 	
	servicetype_param_value text,
	servicetype_param_amount float(8,2)
);

create table service_request_address (
	id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	user_id int(11) NOT NULL,
	address_line1 varchar(200),
	address_line2 varchar(200),
	city varchar(100),
	state varchar(60),
	zip varchar(10),
	country varchar(50)
);
create table service_request_paymentlog (
	id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	buyer_payment_seq_number int(11) NOT NULL,
	seller_payment_seq_number int(11) NOT NULL,
	buyer_charged_date datetime,
	seller_paid_date datetime,
	buyer_payment_status varchar(100),
	seller_payment_status varchar(100),
	remarks text
);

create table buyer_payment (
	id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	buyer_id int(11) NOT NULL,
	service_request_id int(11) NOT NULL,
     card_type VARCHAR(12) NOT NULL,
     card_last_digit INT(4),
	stripe_customer_id varchar(100) NOT NULL,
	stripe_card_token_number varchar(100)
);
 
create table seller_payment (
	id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	seller_id int(11) NOT NULL,
	service_type_id int(11) NOT NULL,
     card_type VARCHAR(12) NOT NULL,
     card_last_digit INT(4),
	stripe_customer_id varchar(100) NOT NULL,
	stripe_card_token_number varchar(100)
);


create table disclosures (
	id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	disclosure_text text
);

create table organisations (
	id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name varchar(100) NOT NULL default 'Individual'
);

create table helps (
	id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	user_id int(11) NOT NULL,
	signer_type enum('Buyer','Seller'),
	subject varchar(100),
	description text,
	created_on datetime	
);

create table screenlabels (
	id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	org_id int(11) NOT NULL default 0,
	name varchar(100),
	description text
);

create table notifications (
	id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	buyer_user_id int(11),
     seller_user_id int(11),
     request_id int(11),
     service_request_id int(11),
     accept_status char(1) default 'P',
     accepted_on datetime,	
	created_on datetime,
	modified_on datetime
);
