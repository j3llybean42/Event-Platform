const { selectEvents, insertEvent, selectEventById, updateEventById } = require("../models/events.models")
const { checkTypeExists, checkEventExists } = require("./app-existence-checks")

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

exports.getEventById = (req, res, next) => {
    const event_id = req.params.event_id
    selectEventById(event_id)
    .then((event) => {
        res.status(200).send({event})
    })
    .catch(next)
}

exports.patchEventById = (req, res, next) => {
    const event_id = req.params.event_id
    const {inc_attendees} = req.body
    const eventExistsQuery = checkEventExists(event_id)
    const patchEventQuery = updateEventById(event_id, inc_attendees)

    Promise.all([patchEventQuery, eventExistsQuery])
    .then((results) => {
        const event = results[0]
        res.status(200).send(event)
    })
    .catch(next)
}