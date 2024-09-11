const { selectEvents } = require("../models/events.models")
const { checkTypeExists } = require("./app-existence-checks")

exports.getEvents = (req, res, next) => {
    const {type, order} = req.query
    const eventsQuery = selectEvents(type, order)
    const queries = [eventsQuery]

    if(type){
        const typeExists = checkTypeExists(type)
        queries.push(typeExists)
    }

    Promise.all(queries)
    .then((results) => {
        const events = results[0]
        res.status(200).send({events})
    })
    .catch(next)
}