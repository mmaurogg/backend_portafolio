var express = require('express');
var Controller = require('../controllers/carrito');
var router = express.Router();


// Datos de prueba dentro del controlador
router.post('/datos-curso', Controller.datosCurso);
router.post('/testCarrito', Controller.test);

// ruta del metodo para crear
router.post('/crearCarrito', Controller.crear);
// ruta del metodo para obtener todos
router.get('/listaCarrito', Controller.getOrders);
// ruta del metodo para obtener por id
router.get('/carrito/:id', Controller.getOrden);
// ruta del metodo para actualizar por id
router.put('/carrito/:id', Controller.update);
// ruta del metodo paraeliminar por id
router.delete('/carrito/:id', Controller.delete);


module.exports = router;