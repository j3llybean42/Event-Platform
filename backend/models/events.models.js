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
