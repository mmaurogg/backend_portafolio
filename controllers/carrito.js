'use strict'

var validator = require('validator');
var Carrito = require('../models/carrito');
const { param } = require('../routes/contacto');
const { CarritoItem } = require('../models/carrito-items');
const carritoItems = require('../models/carrito-items');
const { async } = require('jshint/src/prod-params');


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
            message: 'probando test de Carrito'
        });
    },

    crear: (req, res) => {

        //Recorrer los parametros por POST
        var params = req.body;
        console.log(params);

        const carritoItemsIds = params.carritoItems.map(async item => {
            let nuevaOrden = new CarritoItem({
                quantity: item.quantity,
                product: item.product
            });

            nuevaOrden = await nuevaOrden.save();

            return nuevaOrden._id;
        });

        // Validacion de los datos (validador)

        try {
            var validate_carritoItems = !validator.isEmpty(params.carritoItems);
            var validate_telefonos = !validator.isEmpty(params.telefonos);
            var validate_ubicacion = !validator.isEmpty(params.ubicacion);
            var validate_precioTotal = !validator.isEmpty(params.precioTotal);
            var validate_status = !validator.isEmpty(params.status);
            console.log(validate_carritoItems, validate_telefonos, validate_ubicacion, validate_precioTotal, validate_status);

        } catch (error) {
            console.log(validate_carritoItems, validate_telefonos, validate_ubicacion, validate_precioTotal, validate_status);
            return res.status(200).send({
                status: "error",
                message: "faltan datos para enviar"
            });
        }

        if (validate_carritoItems && validate_telefonos && validate_ubicacion && validate_precioTotal && validate_status) {
            var orden = new Carrito();
            orden.carritoItems = carritoItemsIds;
            orden.telefonos = params.telefonos;
            orden.ubicacion = params.ubicacion;
            orden.precioTotal = params.precioTotal;

            orden.save((error, ordenId) => {
                if (error || !orden) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'el dato no se ha guardado'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    orden: ordenId
                });
            });
        } else {
            return res.status(200).send({
                status: 'error',
                message: 'los datos no son validos'
            });
        }
    },

    getOrden: (req, res) => {

        // Recoger los datos que llegan por url (debe ser fornt (se debe programar para la planilla))
        var ordenId = req.params.id;

        console.log(ordenId);

        //comprueba que el id existe
        if (!ordenId || ordenId == null) {
            return res.status(404).send({
                status: 'error',
                message: 'No existe el orden'
            });
        }

        //buscar orden
        Carrito.findById(ordenId, (error, orden) => {
            if (error || !orden) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el orden'
                });
            }
            //Devolverlo en JSON
            return res.status(200).send({
                status: 'success',
                orden
            });
        });

    },

    getOrders: (req, res) => {
        var query = orden.find({});
        query.sort('_id').exec((error, contacts) => {
            if (error) {
                return res.status(500).send({
                    status: 'error',
                    message: 'no se devolvio datos'
                });
            }
            if (!contacts) {
                return res.status(404).send({
                    status: 'error',
                    message: 'no hay ordens para mostrar'
                });
            }
            return res.status(200).send({
                status: 'success',
                contacts
            });
        });
    },

    update: (req, res) => {
        // Recorrer id del orden por la url
        var ordenId = req.params.id;

        // Recoger los datos que llegan por fornt (se debe programar para la planilla)
        var params = req.body;

        //validar datos
        try {
            var validate_carritoItems = !validator.isEmpty(params.carritoItems);
            var validate_telefonos = !validator.isEmpty(params.telefonos);
        } catch (error) {
            return res.status(200).send({
                status: 'error',
                message: 'faltan datos por enviar'
            });
        }
        if (validate_telefonos && validate_carritoItems) {
            Carrito.findOneAndUpdate({ _id: ordenId }, params, { new: true }, (error, ordenUpdate) => {
                if (error) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar'
                    });
                }
                if (!ordenUpdate) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No exite el contacro'
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    orden: ordenUpdate
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
        var ordenId = req.params.id;
        Carrito.findOneAndDelete({ _id: ordenId }, (error, ordenRemoved) => {
            if (error) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar orden'
                });
            }
            if (!ordenRemoved) {
                return res.status(500).send({
                    status: 'error',
                    message: 'El orden no existe en la base de datos'
                });
            }
            return res.status(200).send({
                status: 'success',
                orden: ordenRemoved
            });
        });
    },

}


module.exports = controller;