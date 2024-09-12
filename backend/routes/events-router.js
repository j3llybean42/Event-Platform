const { getEvents, postEvent } = require("../controllers/events.controllers");

const eventsRouter = require("express").Router();

eventsRouter.route('/').get(getEvents).post(postEvent)
eventsRouter.route('/:event_id').get()

module.exports = eventsRouter