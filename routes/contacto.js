var express = require('express');
var ControllerContacto = require('../controllers/contacto');
// var ControllerProducto = require('../controllers/producto');
// var ControllerCarrito = require('../controllers/carrito');
// var ControllerCarritoItems = require('../controllers/carrito-items');
var router = express.Router();

// Datos de prueba dentro del controlador
router.post('/datos-curso', ControllerContacto.datosCurso);

// Metodos Contacto
router.post('/testContacto', ControllerContacto.test);

router.post('/crearContacto', ControllerContacto.crear);
router.get('/contactos', ControllerContacto.getContactos);
router.get('/contacto/:id', ControllerContacto.getContacto);
router.put('/contacto/:id', ControllerContacto.update);
router.delete('/contacto/:id', ControllerContacto.delete);

//metodos Producto
// router.post('/testProducto', ControllerProducto.test);

// router.post('/crearProducto', ControllerProducto.crear);
// router.get('/productos', ControllerProducto.getProductos);
// router.get('/producto/:id', ControllerProducto.getProducto);
// router.put('/producto/:id', ControllerProducto.update);
// router.delete('/producto/:id', ControllerProducto.delete);

// // Metodos Carrito
// router.post('/testCarrito', ControllerCarrito.test);

// router.post('/crearCarrito', ControllerCarrito.crear);
// router.get('/listaCarrito', ControllerCarrito.getOrders);
// router.get('/carrito/:id', ControllerCarrito.getOrden);
// router.put('/carrito/:id', ControllerCarrito.update);
// router.delete('/carrito/:id', ControllerCarrito.delete);

// // Metodos carritos-item
// router.post('/testCarrito-items', ControllerCarritoItems.test);

// router.post('/crearCarrito-items', ControllerCarritoItems.crear);
// router.get('/listaCarrito-items', ControllerCarritoItems.getItemsCarrito);
// router.get('/Carrito-items/:id', ControllerCarritoItems.getItemCarrito);
// router.put('/Carrito-items/:id', ControllerCarritoItems.update);
// router.delete('/Carrito-items/:id', ControllerCarritoItems.delete);


module.exports = router;