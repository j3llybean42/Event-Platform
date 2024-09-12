const { fetchStaff, fetchStaffEmail } = require("../models/staff.models");

exports.getStaff = (req, res, next) => {
  fetchStaff()
    .then((staff) => res.status(200).send({ staff }))
    .catch(next);
};

exports.getStaffEmail = (req, res, next) => {
  const email = req.params.email;
  fetchStaffEmail(email)
    .then((staffMember) => {
      res.status(200).send({ staffMember });
    })
    .catch(next);
};
