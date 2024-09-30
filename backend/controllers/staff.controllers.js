const { fetchStaff, fetchStaffEmail, updateStaffPassword, checkStaffPassword } = require("../models/staff.models");
const { checkStaffExists, checkStaffEmailExists } = require("./app-existence-checks");

exports.getStaff = (req, res, next) => {
  fetchStaff()
    .then((staff) => res.status(200).send({ staff }))
    .catch(next);
};

exports.getStaffEmail = (req, res, next) => {
  const staff_email = req.params.staff_email;
  fetchStaffEmail(staff_email)
    .then((staffMember) => {
      res.status(200).send({ staffMember });
    })
    .catch(next);
};


