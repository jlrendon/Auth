const bcrypt = require('bcrypt');
const saltRounds = 10;
const { user } = require('../models/user');
const jwt = require('../services/jwt');

exports.register = (req, res) => {
    let params = req.body;
    if (params.email && params.password && params.name) {
        user.findOne({ email: params.email }, (err, respuesta) => {
            if (err) {
                res.status(500).json({ message: 'Ocurrio un Error' });
            } else if (respuesta !== null) {
                res.status(200).json({ message: `El correo ${params.email} ya esta en uso` });
            } else {
                bcrypt.genSalt(saltRounds, function(err, salt) {
                    bcrypt.hash(params.password, salt, function(err, hash) {
                        let newUser = user({
                            name: params.name,
                            email: params.email,
                            password: hash
                        });
                        newUser.save((err, resp) => {
                            if(err){
                                res.status(500).json({message: 'Ocurrio un error', err});
                            } if(resp) {
                                newUser.password = ':('
                                res.status(201).json({status: 'Ok', data: resp});
                            } else {
                                res.status(400).json({message: 'No se creo el usuario'});
                            }
                        });
                    });
                });
            }
        })
    } else {
        res.status(400).json({ message: 'Sin datos' })
    }
}

exports.login = (req, res) => {
    let params = req.body;    
    if (params.email && params.password) {
        user.findOne({ email: params.email }, (err, respuesta) => {
            if (err) {
                res.status(500).json({ message: 'Ocurrio un Error' });
            } else if (respuesta) {               
                bcrypt.compare(params.password, respuesta.password, function(err, valor) {
                    if (err) {
                        res.status(500).json({ message: 'Ocurrio un Error' });
                    } else if (valor == true) {
                        res.status(200).json({ message: `Password correcto`, token: jwt.CreateToken(respuesta) });

                    } else {
                        res.status(200).json({ message: `Password incorrecto` });
                    }
                });
            }
            else {
                res.status(200).json({ message: `Correo no registrado` });
            }
        })
    }
    else {
        res.status(400).json({ message: 'Sin datos' })
    }
}