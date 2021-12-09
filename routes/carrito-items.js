var express = require('express');
var Controller = require('../controllers/carrito-items');
var router = express.Router();


// Datos de prueba dentro del controlador
router.post('/datos-curso', Controller.datosCurso);
router.post('/testCarrito-items', Controller.test);

// ruta del metodo para crear
router.post('/crearCarrito-items', Controller.crear);
// ruta del metodo para obtener todos
router.get('/listaCarrito-items', Controller.getItemsCarrito);
// ruta del metodo para obtener por id
router.get('/Carrito-items/:id', Controller.getItemCarrito);
// ruta del metodo para actualizar por id
router.put('/Carrito-items/:id', Controller.update);
// ruta del metodo paraeliminar por id
router.delete('/Carrito-items/:id', Controller.delete);


module.exports = router;