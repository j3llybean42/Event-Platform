const { getStaff, getStaffEmail } = require("../controllers/staff.controllers")

const staffRouter = require("express").Router()

staffRouter.route("/").get(getStaff)
staffRouter.route("/:email").get(getStaffEmail)

module.exports = staffRouter