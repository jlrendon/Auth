//require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const app = express();
const verify = require('./middlewares/verifyToken');

app.get('/', (req, res) => {
    res.send(`<h1>SERVER</h1>`);
})

mongoose.connect(process.env.MONGOURL, { useNewUrlParser: true }, (err) => {
    if (!err) {
        console.log('Mongo conectado correctamente');
    }
});

//const { user } = require('./models/user');
const { login, register } = require('./controllers/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('<h1>Server</h1>');
})

app.post('/new/user', verify.verifyTkn, register);

app.post('/login', login);

app.listen(process.env.PORT, () => {
    console.log(`Servidor Escuchando en port ${process.env.PORT}`);
})




/*const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const app = express();
const PORT = process.env.PORT || 3000; //Si no encuentras la variable de entorno en el servidor de prod pones el default
const mongoUrl = 'mongodb+srv://devf31:cintanegra@cluster0-hde4c.gcp.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoUrl, {useNewUrlParser: true}, (err) => {
    if(!err) {
        console.log('Mongo conectado correctamente');
    }
}
);

const { user } = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//mongodb+srv://devf31:<password>@cluster0-hde4c.gcp.mongodb.net/test?retryWrites=true&w=majority

app.get('/', (req, res) => {
    res.send('Hola Mundo');
})

app.post('/new/user', (req, res) => {
    let params = req.body;
    if (params.email && params.password && params.name) {
        user.findOne({ email: params.email }, (err, respuesta) => {
            if (err) {
                res.status(500).json({message: `Ocurrió un error`});
            }
            else if (respuesta != null) {
                res.status(500).json({message: `El correo ${params.email} ya existe`});
            }
            else {
                bcrypt.genSalt(saltRounds, function(err, salt) {
                    bcrypt.hash(params.password, salt, function(err, hash) {
                        // Store hash in your password DB.
                        let newUser = user({
                            name: params.name,
                            email: params.email,
                            password: hash
                        });
                        newUser.save((err, resp) =>;
                            newUser.password = 'Ninguno';
                            res.status(201).json({status: 'Ok', data: newUser});
                        )
                    });
                });
            }
        });
    }
//     //Se crea un nuevo modelo
//     let newUser = user({
//         name: params.name,
//         email: params.email,
//         password: params.password
//     });
//    res.send(newUser);
})

app.listen(PORT, () => {
    console.log(`Servidor Escuchando en puerto ${PORT}`)
})*/