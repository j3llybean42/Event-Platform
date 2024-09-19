const { signUp } = require("../controllers/oauth.controllers")

const oauthRouter = require("express").Router()

oauthRouter.route("/signup").post(signUp)
oauthRouter.route("/login", )

module.exports = oauthRouter