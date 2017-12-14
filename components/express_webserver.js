var express = require('express');
var bodyParser = require('body-parser');
var querystring = require('querystring');
var debug = require('debug')('botkit:webserver');
var http = require('http');
var fs = require('fs');
var hbs = require('express-hbs');


module.exports = function(controller) {


    var webserver = express();
    webserver.use(bodyParser.json());
    webserver.use(bodyParser.urlencoded({ extended: true }));

    // set up handlebars ready for tabs
    webserver.engine('hbs', hbs.express4({partialsDir: __dirname + '/../views/partials'}));
    webserver.set('view engine', 'hbs');
    webserver.set('views', __dirname + '/../views/');

    // import express middlewares that are present in /components/express_middleware
    var normalizedPathToMiddleware = require('path').join(__dirname, 'express_middleware');
    if (fs.existsSync(normalizedPathToMiddleware)) {
        fs.readdirSync(normalizedPathToMiddleware).forEach(function(file) {
            require('./express_middleware/' + file)(webserver, controller);
        });
    }

    webserver.use(express.static('public'));

    var server = http.createServer(webserver);

    server.listen(process.env.PORT || 3000, null, function() {

        debug('Express webserver configured and listening at http://localhost:' + process.env.PORT || 3000);

    });

    // TODO: Does this call to identify really belong here?
    if (controller.config.studio_token) {
        controller.studio.identify().then(function(identity) {
            debug('Botkit Studio Identity:', identity.name);
            controller.studio_identity = identity;
            webserver.locals.bot = identity;
        }).catch(function(err) {
            console.log('Error validating Botkit Studio API key!');
            throw new Error(err);
        });
    }

    // import all the pre-defined routes that are present in /components/routes
    var normalizedPathToRoutes = require('path').join(__dirname, 'routes');
    if (fs.existsSync(normalizedPathToRoutes)) {
        fs.readdirSync(normalizedPathToRoutes).forEach(function (file) {
            require('./routes/' + file)(webserver, controller);
        });
    }

    controller.webserver = webserver;
    controller.httpserver = server;

    return webserver;

};
