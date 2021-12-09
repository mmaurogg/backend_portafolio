// Carga de modulos en node para crear servidor
var express = require('express');

// Ejecutar express (http)
var app = express();

var cors = require('cors');

app.use(cors());

// Cargar ficheros turas
const contacto = require('./routes/contacto');
const producto = require('./routes/producto');
const carrito = require('./routes/carrito');
const carritoItems = require('./routes/carrito-items');

// Carga de modulos en Middleware
app.use(express.urlencoded());
app.use(express.json());

// Añadir prefijos a rutas / cargar rutas
app.use('/api', contacto);
app.use('/api', producto);
app.use('/api', carrito);
app.use('/api', carritoItems);

// Exportar modulos (fichero actual)
module.exports = app;