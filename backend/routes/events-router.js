const { getEvents, postEvent, getEventById, patchEventById } = require("../controllers/events.controllers");

const eventsRouter = require("express").Router();

eventsRouter.route('/').get(getEvents).post(postEvent)
eventsRouter.route('/:event_id').get(getEventById).patch(patchEventById)

module.exports = eventsRouter