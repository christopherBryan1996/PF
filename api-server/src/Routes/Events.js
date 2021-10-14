const { Router } = require('express');

const router = Router();

const {getEvents, addEvents, getEventDetail, getAssistans} = require("../Controllers/EventsController")

//ruta para traer todos los eventos
router.get("/", getEvents)

//ruta para traer el detalle de un evento
router.get("/:id", getEventDetail)

//ruta para crear un evento
router.post('/create', addEvents)

//ruta para obtener lista de asistentes
router.get("/:id", getAssistans)

module.exports = router;