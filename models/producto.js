'use strict'

var mongoose = require('mongoose');
var ProductoSchema = mongoose.Schema;

var ProductoSchema = mongoose.Schema({
    categoria: String,
    desc1: String,
    desc2: String,
    producto: String,
    resumen: String,
    subtitulo1: String,
    subtitulo2: String,
    stock: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Producto', ProductoSchema);