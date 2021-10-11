//importar librerias o rutas
const express = require('express')
const app = express()
const morgan=require('morgan')
const cors= require('cors')
const router = require('./src/routers/router')

//middleware
app.use(morgan('dev'))
app.use(cors({
    origin:'*'//para que pueda consultar cualquier paguina 
}))
//para cuando venga desde body
app.use(express.json())
app.use(express.urlencoded({extended:false})) // reconoce objetos de solicitud entrante como cadenas o matrices

//aqui manejaremos todas las rutas
app.use(router)


app.listen(3008,()=>{
    console.log('I lisen in http://localhost:3008')
})
