const db = require("../db/connection");
const fs = require("fs/promises");

exports.selectEvents = (
  type,
  order = "ASC"
) => {
    const validOrderQueries = ["ASC", "DESC"]
    if(!validOrderQueries.includes(order.toUpperCase())){
        return Promise.reject({status: 400, msg: "Invalid order query"})
    }

    let sqlQuery = `
    SELECT * FROM events`
    const queryParams = []

    if (type){
        sqlQuery += ` WHERE event_type = $1`
        queryParams.push(type)
    }

    sqlQuery += ` ORDER BY event_date_time ${order}`

    return db.query(sqlQuery, queryParams).then((results) => results.rows)
};

exports.insertEvent = (newEvent) => {
    const {event_name, event_date_time, event_type, event_description, isFree, attendee_count, max_attendees} = newEvent
    if([event_name, event_date_time, event_type, event_description].includes(undefined) || [event_name, event_date_time, event_type, event_description].includes("")){
        return Promise.reject({status: 400,
            msg: "Bad Request - Missing required information"
        })
    }
    return db.query(
        // insert query for not null columns

        // conditional query part for last 3 columns - check if type exists also

        // values to add into columns
    )
}