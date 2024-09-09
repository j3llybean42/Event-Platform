const format = require('pg-format')
const db = require('../connection')
const { eventData, staffData } = require('../data')


const seed = ({eventData, staffData}) => {
    return db
    .query(`DROP TABLE IF EXISTS events;`)
    .then(() => {
        return db.query(`DROP TABLE IF EXISTS users;`)
    })
    .then(() => {
        return db.query(`DROP TABLE IF EXISTS staff;`)
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
        );`)

        const usersTablePromise = db.query(`
        CREATE TABLE users (
            user_email VARCHAR UNIQUE NOT NULL,
            events_by_id INT []
        );`)

        const staffTablePromise = db.query(`
        CREATE TABLE staff (
        staff_email VARCHAR UNIQUE NOT NULL
        );`)
    })
}
