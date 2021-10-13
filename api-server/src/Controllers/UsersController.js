const User = require('../database/models/schemaUser');

const getUsers = async (req,res) => {

    try {
        const users = await User.find();
        res.send(users)
    } catch (err) {
        console.log(err)
    }
    
};

const createUser = async (req,res) => {
    const {name} = req.body;
    const user = new User({name});
    const result = await user.save();
    res.send(result);
    console.log("usuario guardado")

}


module.exports = {getUsers, createUser};