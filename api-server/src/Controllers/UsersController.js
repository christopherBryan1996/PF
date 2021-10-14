const User = require('../database/models/User');

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users)
    } catch (err) {
        console.log(err)
    }
};

const getUserById = async (req, res) => {

    const { id } = req.params;

    // crea variable con la consulta para evitar error por consola "querry was already executed"
    const findByIdQuery = User.findById(id, (err, user) => {

        if (err) throw err;

        if (!user) {
            return res.status(400).json({
                message: "No se ha encontrado ningun usuario"
            })
        }

        if (user) {
            return res.status(200).json({
                message: "Usuario encontrado",
                user
            })
        }
    });

    // ejecucion de la consulta
    await findByIdQuery.clone()

};

module.exports = { getUsers, getUserById };
