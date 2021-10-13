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

const getEvents = async function(req, res){
    try {
        const events = await User.find();
        res.send(users)
    } catch (err) {
        console.log(err)
    }
}

module.exports = addEvents