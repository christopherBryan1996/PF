const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  usuario: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (username) => {
        if (username.length >= 3 && username.length < 50) {
          return true;
        } else {
          return false;
        }
      },
      message: "Debe ser mayor a 3 caracteres y menor a 50",
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String, //agregar funcion hash antes de guardar pass
    required: true,
  },
  fechaDeCreacion: {
    type: Date,
    default: new Date(),
  },
  eventosCreados: {
    type: [], //array de event._id
  },
  eventsFavoritos: {
    type: [], //array de event._id
  },
  eventosaAsistir: {
    type: [], //array de event._id
  },
});

module.exports = model("User", userSchema);
