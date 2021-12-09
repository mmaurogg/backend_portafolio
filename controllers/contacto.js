'use strict'

var validator = require('validator');
var Contacto = require('../models/contacto');
const { param } = require('../routes/contacto');


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
            message: 'probando test de controlador'
        });
    },

    crear: (req, res) => {
        //Recorrer los parametros por POST
        var params = req.body;
        console.log(params);
        // Validacion de los datos (validador)

        try {
            var validate_nombre = !validator.isEmpty(params.nombre);
            var validate_documento = !validator.isEmpty(params.documento);
            var validate_ubicacion = !validator.isEmpty(params.ubicacion.ciudad);
            var validate_telefonos = !validator.isEmpty(params.telefonos);
            var validate_email = !validator.isEmpty(params.email);
            var validate_contrasena = !validator.isEmpty(params.contrasena);
            var validate_tipo = !validator.isEmpty(params.tipo);
            console.log(validate_nombre, validate_documento, validate_ubicacion, validate_telefonos, validate_email, validate_contrasena, validate_tipo);

        } catch (error) {
            console.log(validate_nombre, validate_documento, validate_ubicacion, validate_telefonos, validate_email, validate_contrasena, validate_tipo);
            return res.status(200).send({
                status: "error",
                message: "faltan datos para enviar"
            });
        }

        if (validate_nombre && validate_documento && validate_ubicacion && validate_telefonos && validate_email && validate_contrasena && validate_tipo) {
            var contacto = new Contacto();
            contacto.nombre = params.nombre;
            contacto.documento = params.documento;
            contacto.ubicacion = params.ubicacion;
            contacto.telefonos = params.telefonos;
            contacto.email = params.email;
            contacto.contrasena = params.contrasena;
            contacto.tipo = params.tipo;
            contacto.ingreso = params.ingreso;

            contacto.save((error, contMes) => {
                if (error || !contacto) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'el dato no se ha guardado'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    contacto: contMes
                });
            });
        } else {
            return res.status(200).send({
                status: 'error',
                message: 'los datos no son validos'
            });
        }
    },

    getContacto: (req, res) => {

        // Recoger los datos que llegan por url (debe ser fornt (se debe programar para la planilla))
        var contactoId = req.params.id;
        console.log(contactoId);

        //comprueba que el id existe
        if (!contactoId || contactoId == null) {
            return res.status(404).send({
                status: 'error',
                message: 'No existe el contacto'
            });
        }

        //buscar contacto
        Contacto.findById(contactoId, (error, contacto) => {
            if (error || !contacto) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el contacto'
                });
            }
            //Devolverlo en JSON
            return res.status(200).send({
                status: 'success',
                contacto
            });
        });

    },

    getContactos: (req, res) => {
        var query = Contacto.find({});
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
                    message: 'no hay contactos para mostrar'
                });
            }
            return res.status(200).send({
                status: 'success',
                contacts
            });
        });
    },

    update: (req, res) => {
        // Recorrer id del contacto por la url
        var contactoId = req.params.id;

        // Recoger los datos que llegan por fornt (se debe programar para la planilla)
        var params = req.body;

        //validar datos
        try {
            var validate_nombre = !validator.isEmpty(params.nombre);
            var validate_documento = !validator.isEmpty(params.documento);
        } catch (error) {
            return res.status(200).send({
                status: 'error',
                message: 'faltan datos por enviar'
            });
        }
        if (validate_documento && validate_nombre) {
            Contacto.findOneAndUpdate({ _id: contactoId }, params, { new: true }, (error, contactoUpdate) => {
                if (error) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar'
                    });
                }
                if (!contactoUpdate) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No exite el contacro'
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    contacto: contactoUpdate
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
        var contactoId = req.params.id;
        Contacto.findOneAndDelete({ _id: contactoId }, (error, contactoRemoved) => {
            if (error) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar contacto'
                });
            }
            if (!contactoRemoved) {
                return res.status(500).send({
                    status: 'error',
                    message: 'El contacto no existe en la base de datos'
                });
            }
            return res.status(200).send({
                status: 'success',
                contacto: contactoRemoved
            });
        });
    },

}


module.exports = controller;