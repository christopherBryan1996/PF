// const { DietaType } = require('../db');

const getEvents = async function(req, res){
    try{
        events = await Events.find()
        res.json(diets);
    }
    catch(error){
        console.error(error);
    }
    console.log('hola')
}

module.exports = {
    getEvents
};