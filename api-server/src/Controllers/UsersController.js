const User = require('../database/models/User');

const getUsers = async (req,res) => {

    try {
        const users = await User.find();
        res.send(users)
    } catch (err) {
        console.log(err)
    }
    
};

module.exports = {getUsers};