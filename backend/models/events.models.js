const db = require("../db/connection");
const fs = require("fs/promises");

exports.selectEvents = (type, order = "ASC") => {
  const validOrderQueries = ["ASC", "DESC"];
  if (!validOrderQueries.includes(order.toUpperCase())) {
    return Promise.reject({ status: 400, msg: "Invalid order query" });
  }

  let sqlQuery = `
    SELECT * FROM events`;
  const queryParams = [];

  if (type) {
    sqlQuery += ` WHERE event_type = $1`;
    queryParams.push(type);
  }

  sqlQuery += ` ORDER BY event_date_time ${order}`;

  return db.query(sqlQuery, queryParams).then((results) => results.rows);
};

exports.insertEvent = (newEvent) => {
  const {
    event_name,
    event_date_time,
    event_type,
    event_description,
    isFree,
    attendee_count,
    max_attendees,
  } = newEvent;
  if (
    [
      event_name,
      event_date_time,
      event_type,
      event_description,
      isFree,
      max_attendees,
    ].includes(undefined) ||
    [
      event_name,
      event_date_time,
      event_type,
      event_description,
      isFree,
      max_attendees,
    ].includes("")
  ) {
    return Promise.reject({
      status: 400,
      msg: "Bad Request - Missing required information",
    });
  }

  return db
    .query(
      `INSERT INTO events (event_name, event_date_time, event_type, event_description, isFree, max_attendees) 
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`, [event_name, event_date_time, event_type, event_description, isFree, max_attendees]
    )
    .then((result) => result.rows);
};

exports.selectEventById = (event_id) => {
  return db.query(`SELECT events.* FROM events WHERE events.event_id = $1`, [event_id])
  .then((result) => {
    const event = result.rows[0]
    if(!event){
      return Promise.reject({status: 404, msg: "Event not found"})
    }
    return event
  })
}

exports.updateEventById = (event_id, inc_attendees) => {
  let queryParams = [event_id, inc_attendees]
  if(typeof inc_attendees !== "number"){
    return Promise.reject({status:400, msg: "Attendee number not given"})
  }
  return db.query(`UPDATE events 
    SET attendee_count = attendee_count + $2
    WHERE event_id = $1
    RETURNING *`, queryParams)
    .then((result) => result.rows[0])
}