const mongoose = require('../db'), Schema= mongoose.Schema
const {model} = require('mongoose');
 
const schemas = {
    userSchema: new Schema({
        id: {
            type: Number
        },
        name:{
            type: String,
            validate:{
                validator: (name)=>{
                    if(name.length>=3 && name.length<50){
                        return true
                    }
                },
            
            }
        }
    })
};

module.exports = model('User', schemas.userSchema);

