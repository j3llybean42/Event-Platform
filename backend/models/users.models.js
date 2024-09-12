const db = require('../db/connection')
const fs = require("fs/promises")

exports.fetchUsers = () => {
    return db.query(`SELECT * FROM users;`).then((result) => result.rows)
}

exports.fetchUsersEmail = (email) => {
    return db.query(`SELECT * FROM users
        WHERE user_email = $1`, [email])
        .then((result) => {
            const user = result.rows[0]
            if(!user){
                return Promise.reject({status: 404, msg: "User not found"})
            }
            return user
        })
}

exports.insertUser = (newUser) => {
    const {user_email} = newUser
    if(user_email === undefined || user_email === ""){
        return Promise.reject({status: 400, msg: "Bad Request - missing email address"})
    }
    return db.query(`INSERT INTO users (user_email) VALUES ($1) RETURNING *`, [user_email])
    .then((result) => result.rows)
}