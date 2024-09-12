const { fetchUsers, fetchUsersEmail, insertUser, updateUserById } = require("../models/users.models")
const { checkEventExists, checkUserExists } = require("./app-existence-checks")

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

exports.patchUserById = (req, res, next) => {
    const user_id = req.params.user_id
    const {event_id} = req.body
    const eventExistsQuery = checkEventExists(event_id)
    const userExistsQuery = checkUserExists(user_id)
    const patchUserQuery = updateUserById(user_id, event_id)

    Promise.all([patchUserQuery, eventExistsQuery, userExistsQuery])
    .then((results) => {
        const user = results[0]
        res.status(200).send({user})
    })
    .catch(next)
}