const mongoose = require('mongoose')
//creamos o selecciona la base de datos

try {
    mongoose.connect('mongodb://localhost/users')
    console.log("DB CONECATADA")
} catch(err) {
    console.log(err)
}

module.exports = mongoose;