const express= require('express')
const router = express.Router()

router.get('/m',(req,res)=>{
    res.send('hola desde router')
})

module.exports= router