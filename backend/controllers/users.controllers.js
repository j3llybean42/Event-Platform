const { fetchUsers, fetchUsersEmail } = require("../models/users.models")

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