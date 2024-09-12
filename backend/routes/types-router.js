const { getTypes } = require("../controllers/types.controllers")

const typeRouter = require("express").Router()

typeRouter.route("/").get(getTypes)

module.exports = typeRouter