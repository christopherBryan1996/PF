// const { DietaType } = require('../db');

const addEvents = async function(req, res){
    try{
        const newEvent = req.body;
        const event = new Event({newEvent});
        const result = await event.save();
        res.send(result);
    }
    catch(error){
        console.error(error);
    }
}

module.exports = addEvents