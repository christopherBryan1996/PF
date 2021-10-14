const Event = require('../database/models/Event');

const getEvents = async function(req, res){
    try {
        const events = await Event.find();
        res.send(events)
    } catch (err) {
        console.log(err)
    }
}

const addEvents = async function(req, res){
    try{
        const newEvent = req.body;
        const event = new Event(newEvent);
        const result = await event.save();
        res.send(result);
    }
    catch(err){
        console.error(err);
    }
};

module.exports = {addEvents, getEvents};