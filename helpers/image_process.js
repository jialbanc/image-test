'use strict';
const fs = require("fs");
const logger = require('winston');
const uuid = require("uuid");
const config = require('../config/config');

module.exports.storeImage = function(body) {
    return new Promise((resolve, reject) => {
        const uidImage=uuid.v4();
        const base64Image = body.file_64.replace(/ /g, '+');
        const buffer = new Buffer(base64Image, 'base64');
        const image_name=uidImage+'.'+body.file_ext;
        fs.writeFile(config.path_files+'/'+image_name, buffer, 'binary', function(err) {
            if(err){
                logger.error(err);
                resolve(false);
            }else{
                logger.info('se subio la imagen')
                resolve(image_name);
            }
        });
    });
};