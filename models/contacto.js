'use strict'

// este es el modelo de la entrada de datos
var mongoose = require('mongoose');
var ContactoSchema = mongoose.Schema;

var ContactoSchema = mongoose.Schema({
    nombre: String,
    documento: String,
    ubicacion: {
        direccion: String,
        ciudad: String
    },
    telefonos: String,
    email: String,
    contrasena: String,
    tipo: String,
    adjuntoRut: String,
    ingreso: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Contacto', ContactoSchema);