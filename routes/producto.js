var express = require('express');
var Controller = require('../controllers/producto');
var router = express.Router();


// Datos de prueba dentro del controlador
router.post('/datos-curso', Controller.datosCurso);
router.post('/testProducto', Controller.test);

// ruta del metodo para crear
router.post('/crearProducto', Controller.crear);
// ruta del metodo para obtener todos
router.get('/productos', Controller.getProductos);
// ruta del metodo para obtener por id
router.get('/producto/:id', Controller.getProducto);
// ruta del metodo para actualizar por id
router.put('/producto/:id', Controller.update);
// ruta del metodo paraeliminar por id
router.delete('/producto/:id', Controller.delete);


module.exports = router;