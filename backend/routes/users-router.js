const { getUsers, getUsersEmail } = require('../controllers/users.controllers')

const userRouter = require("express").Router()

userRouter.route("/").get(getUsers)
userRouter.route("/:email").get(getUsersEmail)

module.exports = userRouter