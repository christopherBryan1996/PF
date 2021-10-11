const mongoose = require('mongoose')
//creamos o selecciona la base de datos
mongoose.connect('mongodb://localhost/users')

module.exports= mongoose