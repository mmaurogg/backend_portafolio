'use strict'

var mongoose = require('mongoose');
var CarritoSchema = mongoose.Schema;

var CarritoSchema = mongoose.Schema({
    carritoItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CarritoItem',
        required: true
    }],
    ubicacion: String,
    telefonos: String,
    precioTotal: Number,
    status: {
        type: String,
        default: 'Pendiente'
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contacto',
    }

});

module.exports = mongoose.model('Carrito', CarritoSchema);