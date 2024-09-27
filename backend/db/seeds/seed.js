const format = require("pg-format");
const db = require("../connection");
const { eventData, staffData, typesData, usersData } = require("../data");

const seed = ({ eventData, staffData }) => {
  return db
    .query(`DROP TABLE IF EXISTS events;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS staff;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS types;`);
    })
    .then(() => {
      const usersTablePromise = db.query(`
        CREATE TABLE users (
          user_id SERIAL PRIMARY KEY,
          user_email VARCHAR UNIQUE NOT NULL,
          events_by_id INT [] DEFAULT ARRAY[]::INT[]
        );`);

      const staffTablePromise = db.query(`
        CREATE TABLE staff (
        staff_id SERIAL PRIMARY KEY,
        staff_email VARCHAR UNIQUE NOT NULL,
        staff_password VARCHAR NOT NULL
        );`);

      const typesTablePromise = db.query(`
        CREATE TABLE types (
        type_name VARCHAR UNIQUE NOT NULL
        );`);

      return Promise.all([
        usersTablePromise,
        staffTablePromise,
        typesTablePromise,
      ]);
    })
    .then(() => {
      const eventsTablePromise = db.query(`
        CREATE TABLE events (
           event_id SERIAL PRIMARY KEY,
           event_name VARCHAR NOT NULL,
           event_date_time TIMESTAMP NOT NULL,
           event_type VARCHAR NOT NULL REFERENCES types(type_name),
           event_description VARCHAR NOT NULL,
           isFree BOOLEAN NOT NULL,
           attendee_count INT DEFAULT 0,
           max_attendees INT NOT NULL
        );`);

      return Promise.all([eventsTablePromise]);
    })
    .then(() => {
      const insertStaffQueryStr = format(
        "INSERT INTO staff (staff_email, staff_password) VALUES %L",
        staffData.map(({ staff_email, staff_password }) => [staff_email, staff_password])
      );
      const staffPromise = db.query(insertStaffQueryStr);
      const insertTypesQueryStr = format(
        "INSERT INTO types (type_name) VALUES %L",
        typesData.map(({ type_name }) => [type_name])
      );
      const typesPromise = db.query(insertTypesQueryStr);

      const insertUsersQueryStr = format(
        "INSERT INTO users (user_email) VALUES %L",
        usersData.map(({ user_email }) => [user_email])
      );
      const usersPromise = db.query(insertUsersQueryStr);

      return Promise.all([staffPromise, typesPromise, usersPromise]);
    })
    .then(() => {
      const insertEventsQueryStr = format(
        "INSERT INTO events (event_name, event_date_time, event_type, event_description, isFree, attendee_count, max_attendees) VALUES %L",
        eventData.map(
          ({
            event_name,
            event_date_time,
            event_type,
            event_description,
            isFree,
            attendee_count,
            max_attendees,
          }) => [
            event_name,
            event_date_time,
            event_type,
            event_description,
            isFree,
            attendee_count,
            max_attendees,
          ]
        )
      );
      return db.query(insertEventsQueryStr);
    });
};

module.exports = seed;
