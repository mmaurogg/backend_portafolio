'use strict'

// este es el modelo de la entrada de datos
var mongoose = require('mongoose');
var carritoItemSchema = mongoose.Schema;

var carritoItemSchema = mongoose.Schema({
    cantidad: {
        type: Number,
        requided: true,
    },
    producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto'
    }

});

module.exports = mongoose.model('CarritoItem', carritoItemSchema);