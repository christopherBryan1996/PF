const User = require('../database/models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/* require("dotenv").config();
*/

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users)
    } catch (err) {
        console.log(err)
    }
};

const register = async (req, res) => {
    try {
        const newUser = new User(req.body);
        newUser.password = bcrypt.hashSync(req.body.password, 2);
        await newUser.save((err, user) => {
            if (err) {
                return res.status(404).send({
                    message: err
                });
            } else {
                return res.json(user)
            }
        })
    }
    catch (err) {
        console.log(err)
    }
};

const login = async (req, res) => {
    User.findOne({
        usuario: req.body.usuario
    },
       async (err, user) => {
            if (err) throw err;
            if (!user) {
                return res.status(401).json({
                    message: 'Autenticacion fallida: nombre de usuario inexistente'
                })
            }
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) throw err;
                if(!result) {
                    return res.status(401).json({
                        message: 'Autenticacion fallida: password incorrecto'
                    })
                }
            }) 
            const token = jwt.sign({
                usuario: user.usuario,
                email: user.email,
                id: user._id
            }, 
            "secret",
            {
                expiresIn: "1h"
            });

            return res.status(200).json({
                message: 'Usuario logueado con exito',
                token
            });
        }
    )
};

module.exports = { getUsers, register, login };