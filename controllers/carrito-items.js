'use strict'

var validator = require('validator');
var ItemCarrito = require('../models/carrito-items');
const { param } = require('../routes/carrito-items');


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
            message: 'probando test de carrito items'
        });
    },

    crear: (req, res) => {
        //Recorrer los parametros por POST
        var params = req.body;
        console.log(params);
        // Validacion de los datos (validador)

        try {
            var validate_producto = !validator.isEmpty(params.producto);
            var validate_cantidad = params.cantidad;

            console.log(validate_producto, validate_cantidad);

        } catch (error) {
            console.log(validate_producto, validate_cantidad);
            return res.status(200).send({
                status: "error",
                message: "faltan datos para enviar"
            });
        }

        if (validate_producto && validate_cantidad) {
            var itemCarrito = new ItemCarrito();
            itemCarrito.producto = params.producto;
            itemCarrito.cantidad = params.cantidad;

            itemCarrito.save((error, contMes) => {
                if (error || !itemCarrito) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'el dato no se ha guardado'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    itemCarrito: contMes
                });
            });
        } else {
            return res.status(200).send({
                status: 'error',
                message: 'los datos no son validos'
            });
        }
    },

    getItemCarrito: (req, res) => {

        // Recoger los datos que llegan por url (debe ser fornt (se debe programar para la planilla))
        var itemCarritoId = req.params.id;
        console.log(itemCarritoId);

        //comprueba que el id existe
        if (!itemCarritoId || itemCarritoId == null) {
            return res.status(404).send({
                status: 'error',
                message: 'No existe el itemCarrito'
            });
        }

        //buscar itemCarrito
        ItemCarrito.findById(itemCarritoId, (error, itemCarrito) => {
            if (error || !itemCarrito) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el itemCarrito'
                });
            }
            //Devolverlo en JSON
            return res.status(200).send({
                status: 'success',
                itemCarrito
            });
        });

    },

    getItemsCarrito: (req, res) => {
        var query = ItemCarrito.find({});
        query.sort('_id').exec((error, items) => {
            if (error) {
                return res.status(500).send({
                    status: 'error',
                    message: 'no se devolvio datos'
                });
            }
            if (!items) {
                return res.status(404).send({
                    status: 'error',
                    message: 'no hay contactos para mostrar'
                });
            }
            return res.status(200).send({
                status: 'success',
                items
            });
        });
    },

    update: (req, res) => {
        // Recorrer id del itemCarrito por la url
        var itemCarritoId = req.params.id;

        // Recoger los datos que llegan por fornt (se debe programar para la planilla)
        var params = req.body;

        //validar datos
        try {
            var validate_producto = !validator.isEmpty(params.producto);
            var validate_cantidad = !validator.isEmpty(params.cantidad);
        } catch (error) {
            return res.status(200).send({
                status: 'error',
                message: 'faltan datos por enviar'
            });
        }
        if (validate_cantidad && validate_producto) {
            ItemCarrito.findOneAndUpdate({ _id: itemCarritoId }, params, { new: true }, (error, itemCarritoUpdate) => {
                if (error) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar'
                    });
                }
                if (!itemCarritoUpdate) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No exite el contacro'
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    itemCarrito: itemCarritoUpdate
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
        var itemCarritoId = req.params.id;
        ItemCarrito.findOneAndDelete({ _id: itemCarritoId }, (error, itemCarritoRemoved) => {
            if (error) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar itemCarrito'
                });
            }
            if (!itemCarritoRemoved) {
                return res.status(500).send({
                    status: 'error',
                    message: 'El itemCarrito no existe en la base de datos'
                });
            }
            return res.status(200).send({
                status: 'success',
                itemCarrito: itemCarritoRemoved
            });
        });
    },

}


module.exports = controller;