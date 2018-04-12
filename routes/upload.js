'use strict';

const express = require("express");
const router = express.Router();
const logger = require('winston');
const image_helper = require('../helpers/image_process');


let configRoutes = function() {
    router.post('/', function (req, res) {
        var response;
        image_helper.storeImage(req.body)
            .then(function(result){
                if(result) {
                    response={
                        notice: "Imagen guardada exitosamente",
                        data: {
                            uid_imagen: result
                        }
                    };
                    res.status(200).send(response);
                }else {
                    response={
                        notice: "Ha ocurrido un error al subir la imagen",
                        data: null
                    };
                    res.status(409).send(response);
                }
            })
            .catch(function(err){
                logger.error(err);
                response={
                    notice: "Ha ocurrido un error al subir la imagen",
                    data: null
                };
                res.status(409).send(response);
            });
    });
    return router;
};

module.exports = configRoutes;