const format = require("pg-format");
const db = require("../connection");
const { eventData, staffData } = require("../data");

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
      const eventsTablePromise = db.query(`
        CREATE TABLE events (
           event_id SERIAL PRIMARY KEY,
           event_name VARCHAR NOT NULL,
           event_date DATE NOT NULL,
           event_time TIME NOT NULL,
           event_type VARCHAR,
           event_description VARCHAR NOT NULL,
           isFree BOOLEAN DEFAULT TRUE
        );`);

      const usersTablePromise = db.query(`
        CREATE TABLE users (
            user_email VARCHAR UNIQUE NOT NULL,
            events_by_id INT []
        );`);

      const staffTablePromise = db.query(`
        CREATE TABLE staff (
        staff_email VARCHAR UNIQUE NOT NULL
        );`);

      return Promise.all([
        eventsTablePromise,
        usersTablePromise,
        staffTablePromise,
      ]);
    })
    .then(() => {
      const insertEventsQueryStr = format(
        "INSERT INTO events (event_name, event_date, event_time, event_type, event_description, isFree) VALUES %L",
        eventData.map(
          ({
            event_name,
            event_date,
            event_time,
            event_type,
            event_description,
            isFree,
          }) => [
            event_name,
            event_date,
            event_time,
            event_type,
            event_description,
            isFree,
          ]
        )
      );
      const eventsPromise = db.query(insertEventsQueryStr);

      const insertStaffQueryStr = format(
        "INSERT INTO staff (staff_email) VALUES %L",
        staffData.map(({ staff_email }) => [staff_email])
      );
      const staffPromise = db.query(insertStaffQueryStr);

      return Promise.all([eventsPromise, staffPromise]);
    });
};

module.exports = seed;
