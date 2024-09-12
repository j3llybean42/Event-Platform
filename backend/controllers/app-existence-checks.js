const db = require('../db/connection')

exports.checkTypeExists = (typeQuery) => {
    return db.query(`SELECT * FROM types WHERE type_name = $1`, [typeQuery])
    .then(({rows}) => {
        if(rows.length === 0){
            return Promise.reject({status: 404, msg: "Event type not found"})
        }
    })
}

exports.checkEventExists = (eventQuery) => {
    return db.query(`SELECT * FROM events WHERE event_id = $1`, [eventQuery])
    .then(({rows}) => {
        if(rows.length === 0){
            return Promise.reject({status: 404, msg: "Event not found"})
        }
    })
}

exports.checkUserExists = (userQuery) => {
    return db.query(`SELECT * FROM users WHERE user_id = $1`, [userQuery])
    .then(({rows}) => {
        if(rows.length === 0){
            return Promise.reject({status: 404, msg: "User not found"})
        }
    })
}