DROP TABLE IF EXISTS events;

CREATE TABLE events (
    event_id SERIAL PRIMARY KEY, 
    event_name VARCHAR NOT NULL, 
    event_date DATE NOT NULL, 
    event_time TIME NOT NULL, 
    event_description VARCHAR NOT NULL, 
    isFree BOOLEAN DEFAULT TRUE);

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_email VARCHAR UNIQUE NOT NULL,
    events_by_id INT []
);

DROP TABLE IF EXISTS staff;

CREATE TABLE staff (
    staff_email VARCHAR UNIQUE NOT NULL
);