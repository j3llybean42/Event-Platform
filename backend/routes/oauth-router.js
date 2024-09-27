import {postOAuthLogin} from "../controllers/oauth.controllers"

const oAuthRouter = require("express").Router()

oAuthRouter.route("/login").post(postOAuthLogin)

module.exports = oAuthRouter