const { Schema, model } = require("mongoose");

//Coleccion para los eventos

const eventSchema = new Schema({
  nombreDelEvento: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  fecha: {
    type: Date,
    require: true,
  },
  descripcion: {
    type: String,
    require: true,
  },
  fechaDeCreacion: {
    type: Date,
    default: new Date(),
  },
  autor: {
    type: String,
    require: true, // guardar username del creador
  },
  asistentes: {
    type: [String], //guardar array de username de asistentes
  },
});

module.exports = model("Event", eventSchema);
