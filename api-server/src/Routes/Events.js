const express = require('express');
const router = express.Router();

const {addEvents, getEvents} = require("../Controllers/EventsController");

// 
router.get('/', getEvents);
router.post('/create', addEvents);


module.exports = router;