const http = require('http');
const config = require('./config/config');
const logger = require('winston');
const express = require("express");
const bodyParser = require("body-parser");
const upload_router = require("./routes/upload");
const upload_middleware = require("./middleware/auth");
const httpImgSteam = require('image-steam').http;

const tsFormat = () => (new Date()).toLocaleTimeString();
logger.add(logger.transports.File, {
    filename: 'image-server.log',
    timestamp: tsFormat,
    //level: 'error'
});
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    timestamp: tsFormat,
    colorize: true
});

/*Servidor con image-steam*/
const connect = new httpImgSteam.Connect(config.steam_conf);
connect.on('error', function(err) {
  logger.error(err);
});
const server =  connect.getHandler();
http.createServer(server).listen(config.puerto);

const app = express();
const server_upload = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
	limit: '50mb'
}));

app.use("/upload",function(req,res,next){
    upload_middleware(req,res,next)
});

app.use("/upload", upload_router());

server_upload.listen(config.upload_puerto, () => {
    logger.info('Api Upload in port: ' + config.upload_puerto);
});