const config = require('../config/config');

/**
 * Función para agregar nivel de seguridad a rutas usadas para configuraciones de API FB y consultas de depuración.
 * @param req
 * @param res
 * @param next
 * @param api
 */
module.exports = function(req,res,next){
    if(req.headers.access_token !== config.access_token){
        res.sendStatus(401);
    }else{
        next();
    }
};