const { getStaff, getStaffEmail, patchStaffPassword, getStaffPassword } = require("../controllers/staff.controllers")

const staffRouter = require("express").Router()

staffRouter.route("/").get(getStaff)
staffRouter.route("/:staff_email").get(getStaffPassword)
staffRouter.route("/:staff_id").patch(patchStaffPassword)

module.exports = staffRouter