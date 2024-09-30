const db = require('../db/connection')
const fs = require("fs/promises");

exports.fetchStaff = () => {
    return db.query(`SELECT * FROM staff;`).then((result) => result.rows)
}

exports.fetchStaffEmail = (staff_email) => {
    return db.query(`SELECT * FROM staff
        WHERE staff_email = $1`, [staff_email])
        .then((result) => {
            const staffMember = result.rows[0]
            if(!staffMember){
                return Promise.reject({status: 404, msg: "Staff member not found"})
            }
            return staffMember
        })
}

