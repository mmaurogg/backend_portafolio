// const express = require("express");
// const port = 4040; // defino el puerto
// const app = express(); //crear aplicacion

// app.get('/', function(req,res) {
//     res.send('<h1>Hola mundo</h1>');
// });

// app.listen(port, function() {
//     console.log("funcionando en el puerto: ", port);
// });

var mongoose = require('mongoose');
var app = require('./app');
var cors = require('cors');
var port = 4040;

app.use(cors());

mongoose.Promise = global.Promise; //la crea de manera global para cuando me conecto
mongoose.connect('mongodb://localhost:27017/contactos', { useNewUrlParser: true })
    .then(() => {
        console.log('Conexion a BD lograda');
        app.listen(port, () => {
            console.log('servidor corriendo en puerto', port);
        });
    });