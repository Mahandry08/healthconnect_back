
CREATE  TABLE notification ( 
	notification_id      INT    NOT NULL   PRIMARY KEY,
	user_id              INT    NOT NULL   ,
	type               INT    NOT NULL   ,
	content              LONGTEXT    NOT NULL   ,
	sending_at           DATETIME       ,
	status             INT  DEFAULT (0)  NOT NULL   
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE  TABLE specialities ( 
	speciality_id        INT    NOT NULL AUTO_INCREMENT  PRIMARY KEY,
	speciality_name      VARCHAR(255)       ,
	description          VARCHAR(255)       ,
	createdAt          DATETIME  DEFAULT (current_timestamp())     ,
	updatedAt          DATETIME  DEFAULT (current_timestamp()) ON UPDATE current_timestamp()    
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO specialities (speciality_name, description) VALUES
('Cardiologie', 'Spécialité traitant les maladies du cœur'),
('Dermatologie', 'Spécialité des maladies de la peau'),
('Pédiatrie', 'Spécialité des soins aux enfants');

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
	status             INT  DEFAULT (0)  NOT NULL   ,
	createdAt            DATETIME    DEFAULT (current_timestamp())   ,
	updatedAt            DATETIME    DEFAULT (current_timestamp()) ON UPDATE current_timestamp()  ,
	CONSTRAINT email UNIQUE ( email ) 
 );

 INSERT INTO users (name, firstname, email, password, role, birthday, address, phone_number, status) VALUES
('Rakoto', 'rakoto', 'rakoto@gmail.com', sha1('rakoto'), 0, '1990-05-15 00:00:00', '123 Main St, City', '555-0101', 1),
('Smith', 'Jane', 'jane@gmail.com', sha1('jane'), 1, '1985-03-22 00:00:00', '456 Oak Ave, Town', '555-0102', 1),
('Brown', 'Mike', 'mike@gmail.com', sha1('mike'), 0, '1995-11-10 00:00:00', '789 Pine Rd, Village', '555-0103', 1),
('Taylor', 'Emma', 'emma@gmail.com', sha1('emma'), 1, '1980-07-18 00:00:00', '101 Elm St, City', '555-0104', 1);

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
	createdAt          DATETIME  DEFAULT (current_timestamp())     
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX fk_conversation_users ON conversation ( user1_id );

CREATE INDEX fk_conversation_users_0 ON conversation ( user2_id );

CREATE  TABLE doctor_specialities ( 
	doctor_speciality_id INT    NOT NULL AUTO_INCREMENT  PRIMARY KEY,
	user_id              INT       ,
	speciality_id        INT       ,
	createdAt          	DATETIME  DEFAULT (current_timestamp())     
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

 INSERT INTO doctor_specialities (user_id, speciality_id) VALUES
(2, 1), -- Jane Smith est cardiologue
(4, 3); -- Emma Taylor est pédiatre


CREATE INDEX user_id ON doctor_specialities ( user_id );

CREATE INDEX speciality_id ON doctor_specialities ( speciality_id );

CREATE  TABLE medical_profile ( 
	profile_id           INT    NOT NULL AUTO_INCREMENT  PRIMARY KEY,
	user_id              INT       ,
	medical_history      TEXT       ,
	allergies            TEXT       ,
	updatedAt            DATETIME  DEFAULT (current_timestamp()) ON UPDATE current_timestamp()    ,
	createdAt        	 DATETIME  DEFAULT (current_timestamp())     
 ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;


INSERT INTO medical_profile (user_id, medical_history, allergies) VALUES
(1, 'Hypertension diagnostiquée en 2020', 'Pollen, pénicilline'),
(3, 'Asthme léger depuis l’enfance', 'Aucune allergie connue');


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
	status             INT  DEFAULT (0)  NOT NULL   ,
	speciality_id        INT    NOT NULL   ,
	createdAt            DATETIME    DEFAULT (current_timestamp())   ,
	updatedAt            DATETIME    DEFAULT (current_timestamp())  ON UPDATE current_timestamp()   
 );

INSERT INTO consultations (user_id, doctor_id, consultation_date, diagnostic, videocall_id, status, speciality_id) VALUES
(1, 2, '2025-05-06 10:00:00', 'Contrôle de l’hypertension', 1001, 1, 1),
(3, 4, '2025-05-07 14:00:00', 'Suivi de l’asthme', 1002, 1, 3);


CREATE INDEX fk_consultations_users ON consultations ( user_id );

CREATE INDEX fk_consultations_specialities ON consultations ( speciality_id );

CREATE  TABLE prescriptions ( 
	prescription_id      INT    NOT NULL AUTO_INCREMENT  PRIMARY KEY,
	consultation_id      INT    NOT NULL   ,
	prescription_date    DATETIME    NOT NULL   ,
	instructions         TEXT    NOT NULL   ,
	createdAt            DATETIME    DEFAULT (current_timestamp())  ,
	updatedAt            DATETIME    DEFAULT (current_timestamp())  ON UPDATE current_timestamp()   ,
	CONSTRAINT unq_prescriptions_consultation_id UNIQUE ( consultation_id ) 
 );

 INSERT INTO prescriptions (consultation_id, prescription_date, instructions) VALUES
(1, '2025-05-06 10:30:00', 'Prendre 10 mg d’amlodipine par jour'),
(2, '2025-05-07 14:30:00', 'Utiliser un inhalateur de salbutamol au besoin');

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

CREATE VIEW doctors_view AS
SELECT 
    u.user_id,
    u.name,
    u.firstname,
    u.email,
    u.phone_number,
    u.address,
    s.speciality_id,
    s.speciality_name,
    s.description AS speciality_description
FROM 
    users u
    INNER JOIN doctor_specialities ds ON u.user_id = ds.user_id
    INNER JOIN specialities s ON ds.speciality_id = s.speciality_id
WHERE 
    u.status = 1
    AND u.role = 1;


CREATE VIEW patient_consultations_view AS
SELECT 
    c.consultation_id,
    c.user_id AS user_id,
    u.name AS patient_name,
    u.firstname AS patient_firstname,
    u.email AS patient_email,
    c.doctor_id,
    d.name AS doctor_name,
    d.firstname AS doctor_firstname,
    c.consultation_date,
    c.diagnostic,
    c.status AS consultation_status,
    s.speciality_name,
    c.createdAt AS consultation_createdAt,
    c.updatedAt AS consultation_updatedAt
FROM 
    consultations c
    INNER JOIN users u ON c.user_id = u.user_id
    INNER JOIN users d ON c.doctor_id = d.user_id
    INNER JOIN specialities s ON c.speciality_id = s.speciality_id
WHERE 
    u.role = 0
    AND c.status = 1;