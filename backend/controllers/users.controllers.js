const { fetchUsers, fetchUsersEmail, insertUser } = require("../models/users.models")

exports.getUsers = (req, res, next) => {
    fetchUsers()
    .then((users) => res.status(200).send({users}))
    .catch(next)
}

exports.getUsersEmail = (req, res, next) => {
    const email = req.params.email
    fetchUsersEmail(email)
    .then((user) => {
        res.status(200).send({user})
    })
    .catch(next)
}

exports.postUser = (req, res, next) => {
    const newUser = req.body
    insertUser(newUser)
    .then((user) => {
        res.status(201).send({user})
    })
    .catch(next)
}