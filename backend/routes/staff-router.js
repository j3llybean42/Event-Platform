const { getStaff, getStaffEmail, patchStaffPassword, getStaffPassword } = require("../controllers/staff.controllers")

const staffRouter = require("express").Router()

staffRouter.route("/").get(getStaff)
staffRouter.route("/find/:staff_email").get(getStaffEmail)

module.exports = staffRouter