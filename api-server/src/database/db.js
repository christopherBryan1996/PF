const mongoose = require("mongoose");

//direccion de localhost -> luego pasar .env
const uri = "mongodb://localhost:27017/clanAppDB";

async function connection() {
  try {
    await mongoose.connect(uri, {
      //conexion a la db clanAppDB
      useNewUrlParser: true, //para evitar errores configuramos estos parametros
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error(error);
  }
}

//mensaje de conexion exitosa
mongoose.connection.once("open", (_) => {
  console.log("database is connnected to", uri);
});

connection();
//en los endpoints importar require("../db.js") para que se haga la conexion;
