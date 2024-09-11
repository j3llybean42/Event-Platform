const { getEndpoints } = require("../controllers/app.controllers");
const eventsRouter = require("./events-router");
const apiRouter = require("express").Router();

apiRouter.get("/", getEndpoints)
apiRouter.use("/events", eventsRouter)

module.exports = apiRouter