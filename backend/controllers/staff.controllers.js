const { fetchStaff, fetchStaffEmail, updateStaffPassword, checkStaffPassword } = require("../models/staff.models");
const { checkStaffExists, checkStaffEmailExists } = require("./app-existence-checks");

exports.getStaff = (req, res, next) => {
  fetchStaff()
    .then((staff) => res.status(200).send({ staff }))
    .catch(next);
};

exports.getStaffEmail = (req, res, next) => {
  const staff_email = req.params.email;
  fetchStaffEmail(staff_email)
    .then((staffMember) => {
      res.status(200).send({ staffMember });
    })
    .catch(next);
};

exports.patchStaffPassword = (req, res, next) => {
  const {new_password} = req.body
  const staff_id = req.params.staff_id
  const staffExistsQuery = checkStaffExists(staff_id)
  const patchStaffQuery = updateStaffPassword(staff_id, new_password)

  Promise.all([staffExistsQuery, patchStaffQuery])
  .then((results) => {
    const staff = results[0]
    res.status(200).send(staff)
  })
  .catch(next)
}

exports.getStaffPassword = (req, res, next) => {
  const input_password  = req.query
  const staff_email = req.params.staff_email
  const staffExistsQuery = checkStaffEmailExists(staff_email)
  const getPasswordQuery = checkStaffPassword(staff_email, input_password)

  Promise.all([staffExistsQuery, getPasswordQuery])
  .then((results) => {
    const returned_staff_id = results[1]
    if(!returned_staff_id){
      return Promise.reject({status: 401, msg: "Password does not match"})
    }
    res.status(200).send(returned_staff_id)
  })
  .catch(next)
}
