const db = require('../db/connection')

exports.checkTypeExists = (typeQuery) => {
    return db.query(`SELECT * FROM types WHERE type_name = $1`, [typeQuery])
    .then(({rows}) => {
        if(rows.length === 0){
            return Promise.reject({status: 404, msg: "Event type not found"})
        }
    })
}