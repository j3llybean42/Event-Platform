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

exports.updateStaffPassword = (staff_id, new_password) => {
    return db.query(`UPDATE staff
        SET staff_password = crypt($1, gen_salt('bf'))
        WHERE staff_id = $2
        RETURNING *`,
    [new_password, staff_id])
    .then((result) => result.rows[0])
}

exports.checkStaffPassword = (staff_email, input_password) => {
    return db.query(`SELECT staff_id FROM staff 
        WHERE staff_email = $2
        AND staff_password = crypt($1, staff_password)`, [input_password, staff_email])
        .then((result) => result.rows[0])
}