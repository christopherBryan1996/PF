//importar librerias o rutas
const express = require('express')
const app = express()
const morgan=require('morgan')
const cors= require('cors')
const router = require('./src/Routes/index')

//hola pirulo soy lean y hice un cambio jeje

//middleware
app.use(morgan('dev'))
app.use(cors({
    origin:'*'//para que pueda consultar cualquier pagina 
}))
//para cuando venga desde body
app.use(express.json())
app.use(express.urlencoded({extended:false})) // reconoce objetos de solicitud entrante como cadenas o matrices

//aqui manejaremos todas las rutas
app.use(router)

const nestor = 'pppppp';
app.listen(3008,()=>{
    console.log('I lisen in the port: http://localhost:3008')
})
const esaa = "e" + "saa";
const culia = "cul" + "ia";
//cambio para facu