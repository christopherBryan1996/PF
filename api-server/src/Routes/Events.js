const { Router } = require('express');

const router = Router();

const {getEvents, addEvents, getEventDetail} = require("../Controllers/EventsController")

//ruta para traer todos los eventos
router.get("/", getEvents)

//ruta para traer el detalle de un evento
router.get("/:id", getEventDetail)

//ruta para crear un evento
router.post('/create', addEvents)

module.exports = router;