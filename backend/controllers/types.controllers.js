const { selectTypes } = require("../models/types.models")

exports.getTypes = (req, res, next) => {
    selectTypes()
    .then((types) => res.status(200).send({types}))
    .catch(next)
}