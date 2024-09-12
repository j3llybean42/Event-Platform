const { selectEvents, insertEvent } = require("../models/events.models")
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

exports.postEvent = (req, res, next) => {
    const newEvent = req.body
    const type = newEvent.event_type
    const typeExists = checkTypeExists(type)
    const insertQuery = insertEvent(newEvent)
    Promise.all([typeExists, insertQuery])
    .then((results) => {
        const event = results[1]
        res.status(201).send({event})
    })
    .catch(next)
}