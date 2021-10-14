const Event = require('../database/models/Event');


const addEvents = async function(req, res){
    try{
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
    } 
    catch (err) {
        console.log(err)
    }
}

const getEventDetail = async function(req, res){
    try {
        const assistans = req.query.list
        const {id} = req.params;
        const detail = await Event.findById(id);

        if(!assistans){
            res.send(detail)
        }
        else{
            const list = detail.asistentes;
            res.send(list);
        }
    } 
    catch (err) {
        console.log(err)
    }
}


module.exports = {
    addEvents, 
    getEvents,
    getEventDetail
}