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
    type: [], //guardar objetos { usernameDelAsistente: '' ,  tareasdelAsistente: []}
  },
  image: {
    type: String,
    default: "https://images.unsplash.com/photo-1572575156811-2ae050d748d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
  }
});

module.exports = model("Event", eventSchema);
