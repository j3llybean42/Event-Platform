const { getEndpoints } = require("../controllers/app.controllers");
const eventsRouter = require("./events-router");
const staffRouter = require("./staff-router");
const userRouter = require("./users-router");
const apiRouter = require("express").Router();

apiRouter.get("/", getEndpoints)
apiRouter.use("/events", eventsRouter)
apiRouter.use("/users", userRouter)
apiRouter.use("/staff", staffRouter)

module.exports = apiRouter