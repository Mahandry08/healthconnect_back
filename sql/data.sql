
CREATE  TABLE notification ( 
	notification_id      INT    NOT NULL   PRIMARY KEY,
	user_id              INT    NOT NULL   ,
	`type`               INT    NOT NULL   ,
	content              LONGTEXT    NOT NULL   ,
	sending_at           DATETIME       ,
	`status`             INT  DEFAULT (0)  NOT NULL   
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE  TABLE specialities ( 
	speciality_id        INT    NOT NULL AUTO_INCREMENT  PRIMARY KEY,
	speciality_name      VARCHAR(255)       ,
	description          VARCHAR(255)       ,
	`createdAt`          DATETIME  DEFAULT (current_timestamp())     ,
	`updatedAt`          DATETIME  DEFAULT (current_timestamp()) ON UPDATE current_timestamp()    
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE  TABLE users ( 
	user_id              INT    NOT NULL AUTO_INCREMENT  PRIMARY KEY,
	name                 VARCHAR(255)    NOT NULL   ,
	firstname            VARCHAR(255)    NOT NULL   ,
	email                VARCHAR(255)    NOT NULL   ,
	password             VARCHAR(255)    NOT NULL   ,
	role                 INT    NOT NULL   ,
	birthday             DATETIME       ,
	address              VARCHAR(255)       ,
	phone_number         VARCHAR(255)       ,
	`status`             INT  DEFAULT (0)  NOT NULL   ,
	createdat            DATETIME    NOT NULL   ,
	updatedat            DATETIME    NOT NULL   ,
	CONSTRAINT email UNIQUE ( email ) 
 );

CREATE  TABLE chat ( 
	chat_id              INT    NOT NULL   PRIMARY KEY,
	content              TEXT    NOT NULL   ,
	sent_at              DATETIME  DEFAULT (current_timestamp())     ,
	is_read              BOOLEAN  DEFAULT (false)  NOT NULL   ,
	sender_id            INT    NOT NULL   ,
	receiver_id          INT    NOT NULL   
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX fk_chat_users ON chat ( sender_id );

CREATE INDEX fk_chat_users_0 ON chat ( receiver_id );

CREATE  TABLE conversation ( 
	conversation_id      INT    NOT NULL   PRIMARY KEY,
	user1_id             INT    NOT NULL   ,
	user2_id             INT    NOT NULL   ,
	created_at           DATETIME  DEFAULT (current_timestamp())     
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX fk_conversation_users ON conversation ( user1_id );

CREATE INDEX fk_conversation_users_0 ON conversation ( user2_id );

CREATE  TABLE doctor_specialities ( 
	doctor_speciality_id INT    NOT NULL AUTO_INCREMENT  PRIMARY KEY,
	user_id              INT       ,
	speciality_id        INT       ,
	`createdAt`          DATETIME  DEFAULT (current_timestamp())     
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX user_id ON doctor_specialities ( user_id );

CREATE INDEX speciality_id ON doctor_specialities ( speciality_id );

CREATE  TABLE medical_profile ( 
	profile_id           INT    NOT NULL AUTO_INCREMENT  PRIMARY KEY,
	user_id              INT       ,
	medical_history      TEXT       ,
	allergies            TEXT       ,
	updatedat            DATETIME  DEFAULT (current_timestamp()) ON UPDATE current_timestamp()    ,
	createdat            DATETIME  DEFAULT (current_timestamp())     
 ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

CREATE INDEX user_id ON medical_profile ( user_id );

CREATE  TABLE chat_conversation ( 
	chat_conversation_id INT    NOT NULL   PRIMARY KEY,
	chat_id              INT    NOT NULL   ,
	conversation_id      INT       
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX fk_chat_conversation_chat ON chat_conversation ( chat_id );

CREATE INDEX fk_chat_conversation_conversation ON chat_conversation ( conversation_id );

CREATE  TABLE consultations ( 
	consultation_id      INT    NOT NULL AUTO_INCREMENT  PRIMARY KEY,
	user_id              INT    NOT NULL   ,
	doctor_id            INT    NOT NULL   ,
	consultation_date    DATETIME    NOT NULL   ,
	diagnostic           TEXT       ,
	videocall_id         INT       ,
	`status`             INT  DEFAULT (0)  NOT NULL   ,
	createdat            DATETIME    NOT NULL   ,
	speciality_id        INT    NOT NULL   ,
	updatedat            DATETIME    NOT NULL   
 );

CREATE INDEX fk_consultations_users ON consultations ( user_id );

CREATE INDEX fk_consultations_specialities ON consultations ( speciality_id );

CREATE  TABLE prescriptions ( 
	prescription_id      INT    NOT NULL AUTO_INCREMENT  PRIMARY KEY,
	consultation_id      INT    NOT NULL   ,
	prescription_date    DATETIME    NOT NULL   ,
	instructions         TEXT    NOT NULL   ,
	createdat            DATETIME    NOT NULL   ,
	updatedat            DATETIME    NOT NULL   ,
	CONSTRAINT unq_prescriptions_consultation_id UNIQUE ( consultation_id ) 
 );

ALTER TABLE chat ADD CONSTRAINT fk_chat_users_1 FOREIGN KEY ( sender_id ) REFERENCES users( user_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE chat ADD CONSTRAINT fk_chat_users_2 FOREIGN KEY ( receiver_id ) REFERENCES users( user_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE chat_conversation ADD CONSTRAINT fk_chat_conversation_chat_0 FOREIGN KEY ( chat_id ) REFERENCES chat( chat_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE chat_conversation ADD CONSTRAINT fk_chat_conversation_conversation_0 FOREIGN KEY ( conversation_id ) REFERENCES conversation( conversation_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE consultations ADD CONSTRAINT fk_consultations_prescriptions FOREIGN KEY ( consultation_id ) REFERENCES prescriptions( consultation_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE consultations ADD CONSTRAINT fk_consultations_users FOREIGN KEY ( user_id ) REFERENCES users( user_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE conversation ADD CONSTRAINT fk_conversation_users_1 FOREIGN KEY ( user1_id ) REFERENCES users( user_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE conversation ADD CONSTRAINT fk_conversation_users_2 FOREIGN KEY ( user2_id ) REFERENCES users( user_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE doctor_specialities ADD CONSTRAINT doctor_specialities_ibfk_1 FOREIGN KEY ( user_id ) REFERENCES users( user_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE doctor_specialities ADD CONSTRAINT doctor_specialities_ibfk_2 FOREIGN KEY ( speciality_id ) REFERENCES specialities( speciality_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE medical_profile ADD CONSTRAINT medical_profile_ibfk_1 FOREIGN KEY ( user_id ) REFERENCES users( user_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE prescriptions ADD CONSTRAINT fk_prescriptions_consultations FOREIGN KEY ( consultation_id ) REFERENCES consultations( consultation_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

CREATE VIEW patient_medical_view AS select `u`.`user_id` AS `user_id`,`u`.`name` AS `name`,`u`.`firstname` AS `firstname`,`u`.`email` AS `email`,`u`.`phone_number` AS `phone_number`,`u`.`birthday` AS `birthday`,`u`.`address` AS `address`,`mp`.`medical_history` AS `medical_history`,`mp`.`allergies` AS `allergies` from (`users` `u` left join `medical_profile` `mp` on(`u`.`user_id` = `mp`.`user_id`)) where `u`.`role` = 0;

