const Event = require('../database/models/Event');


const addEvents = async function(req, res){
    try{
        const newEvent = req.body;
        const event = new Event(req.body);
        const result = await event.save();
        res.send(result);
    }
    catch(error){
        console.error(error);
    }
}

const getEvents = async function(req, res){
    try {
        const events = await Event.find();
        res.send(events)
    } catch (err) {
        console.log(err)
    }
}

const getEventDetail = async function(req, res){
    try {
        const {id} = req.params;
        const detail = await Event.findById(id);
        res.send(detail)
    } catch (err) {
        console.log(err)
    }
}


module.exports = {
    addEvents, 
    getEvents,
    getEventDetail
}