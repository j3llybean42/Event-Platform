const { getUsers, getUsersEmail, postUser, patchUserById } = require('../controllers/users.controllers')

const userRouter = require("express").Router()

userRouter.route("/").get(getUsers).post(postUser)
userRouter.route("/:email").get(getUsersEmail)
userRouter.route("/:user_id").patch(patchUserById)

module.exports = userRouter