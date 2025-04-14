CREATE TABLE medical_profile(
    profile_id int auto_increment,
    user_id int,
    medical_history TEXT,
    allergies TEXT,
    updatedAt datetime default current_timestamp on update current_timestamp,
    createdAt datetime default current_timestamp,
    PRIMARY KEY (profile_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE specialities(
    speciality_id int auto_increment,
    speciality_name VARCHAR(255),
    description VARCHAR(255),
    createdAt datetime default current_timestamp,
    updatedAt datetime default current_timestamp on update current_timestamp,
    PRIMARY KEY (speciality_id)
);

CREATE TABLE doctor_specialities(
    doctor_speciality_id int auto_increment,
    user_id int,
    speciality_id int,
    createdAt datetime default current_timestamp,
    PRIMARY KEY (doctor_speciality_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN kEY (speciality_id) REFERENCES specialities(speciality_id)
);


CREATE VIEW patient_medical_view AS
SELECT 
    u.user_id AS user_id,
    u.name,
    u.firstname,
    u.email,
    u.phone_number,
    u.birthday,
    u.address,
    mp.medical_history,
    mp.allergies
FROM 
    users u
LEFT JOIN 
    medical_profile mp ON u.user_id = mp.user_id
WHERE 
    u.role = 0;