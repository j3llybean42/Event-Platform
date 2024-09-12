const { getUsers, getUsersEmail, postUser } = require('../controllers/users.controllers')

const userRouter = require("express").Router()

userRouter.route("/").get(getUsers).post(postUser)
userRouter.route("/:email").get(getUsersEmail)

module.exports = userRouter