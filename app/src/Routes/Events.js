const { Router } = require('express');

const router = Router();

const {getEvents} = require("../Controllers/EventsController")

router.get("/", getEvents)

module.exports = router;