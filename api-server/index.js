//importar librerias o rutas
const express = require('express');
const morgan =require('morgan');
const cors = require('cors');

require("dotenv").config();

const app = express();

// importing routes
const router = require('./src/Routes/index');

require('./src/database/db');

//middleware
app.use(morgan('dev'))
app.use(cors({
    origin:'*'//para que pueda consultar cualquier pagina 
}));

//para cuando venga desde body
app.use(express.json());
app.use(express.urlencoded({extended:false})); // reconoce objetos de solicitud entrante como cadenas o matrices

//aqui manejaremos todas las rutas
app.use(router);

app.listen(3008,()=>{
    console.log('I listen in the port: http://localhost:3008')
});