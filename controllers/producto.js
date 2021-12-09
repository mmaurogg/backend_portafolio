'use strict'

var validator = require('validator');
var Producto = require('../models/producto');
const { param } = require('../routes/producto');


var controller = {
    datosCurso: (req, res) => {
        return res.status(200).send({
            curso: "NRC 53876",
            tema: 'Servidor express',
            basedatos: "NoSQL"
        });
    },

    test: (req, res) => {
        return res.status(200).send({
            message: 'probando test de controlador del producto'
        });
    },

    crear: (req, res) => {
        //Recorrer los parametros por POST
        var params = req.body;
        console.log(params);
        // Validacion de los datos (validador)
        try {
            var validate_categoria = !validator.isEmpty(params.categoria);
            var validate_desc1 = !validator.isEmpty(params.desc1);
            var validate_desc2 = !validator.isEmpty(params.desc2);
            var validate_producto = !validator.isEmpty(params.producto);
            var validate_resumen = !validator.isEmpty(params.resumen);
            var validate_subtitulo1 = !validator.isEmpty(params.subtitulo1);
            var validate_subtitulo2 = !validator.isEmpty(params.subtitulo2);
            var validate_stock = params.stock;
            console.log(validate_categoria, validate_desc1, validate_desc2, validate_producto, validate_resumen, validate_subtitulo1, validate_subtitulo2, validate_stock);

        } catch (error) {
            console.log(validate_categoria, validate_desc1, validate_desc2, validate_producto, validate_resumen, validate_subtitulo1, validate_subtitulo2, validate_stock);
            return res.status(200).send({
                status: "error",
                message: "faltan datos para enviar"
            });
        }

        if (validate_categoria && validate_desc1 && validate_desc2 && validate_producto && validate_resumen && validate_subtitulo1 && validate_subtitulo2 && validate_stock) {
            var producto = new Producto();
            producto.categoria = params.categoria;
            producto.desc1 = params.desc1;
            producto.desc2 = params.desc2;
            producto.producto = params.producto;
            producto.resumen = params.resumen;
            producto.subtitulo1 = params.subtitulo1;
            producto.subtitulo2 = params.subtitulo2;
            producto.stock = params.stock;

            producto.save((error, prodMes) => {
                if (error || !producto) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'el dato no se ha guardado'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    producto: prodMes
                });
            });
        } else {
            return res.status(200).send({
                status: 'error',
                message: 'los datos no son validos'
            });
        }
    },

    getProducto: (req, res) => {

        // Recoger los datos que llegan por url (debe ser fornt (se debe programar para la planilla))
        var productoId = req.params.id;
        console.log(productoId);

        //comprueba que el id existe
        if (!productoId || productoId == null) {
            return res.status(404).send({
                status: 'error',
                message: 'No existe el producto'
            });
        }

        //buscar producto
        Producto.findById(productoId, (error, producto) => {
            if (error || !producto) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el producto'
                });
            }
            //Devolverlo en JSON
            return res.status(200).send({
                status: 'success',
                producto
            });
        });

    },

    getProductos: (req, res) => {
        var query = Producto.find({});
        query.sort('_id').exec((error, products) => {
            if (error) {
                return res.status(500).send({
                    status: 'error',
                    message: 'no se devolvio datos'
                });
            }
            if (!products) {
                return res.status(404).send({
                    status: 'error',
                    message: 'no hay contactos para mostrar'
                });
            }
            return res.status(200).send({
                status: 'success',
                products
            });
        });
    },

    update: (req, res) => {
        // Recorrer id del producto por la url
        var productoId = req.params.id;

        // Recoger los datos que llegan por fornt (se debe programar para la planilla)
        var params = req.body;

        //validar datos
        try {
            var validate_desc1 = !validator.isEmpty(params.desc1);
            var validate_stock = params.stock;
        } catch (error) {
            return res.status(200).send({
                status: 'error',
                message: 'faltan datos por enviar'
            });
        }
        if (validate_desc1 && validate_stock) {
            Producto.findOneAndUpdate({ _id: productoId }, params, { new: true }, (error, productoUpdate) => {
                if (error) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar'
                    });
                }
                if (!productoUpdate) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No exite el producto'
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    producto: productoUpdate
                });
            });
        } else {
            return res.status(200).send({
                status: 'error',
                message: 'La validación no es correcta'
            });
        }
    },

    delete: (req, res) => {
        var productoId = req.params.id;
        Producto.findOneAndDelete({ _id: productoId }, (error, productoRemoved) => {
            if (error) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar producto'
                });
            }
            if (!productoRemoved) {
                return res.status(500).send({
                    status: 'error',
                    message: 'El producto no existe en la base de datos'
                });
            }
            return res.status(200).send({
                status: 'success',
                producto: productoRemoved
            });
        });
    },

}


module.exports = controller;