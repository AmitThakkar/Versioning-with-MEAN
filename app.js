/**
 * Created by Amit Thakkar on 24/06/15.
 */
(function (require) {
    var express = require('express');
    var app = express();
    var bodyParser = require('body-parser');  // for reading POSTed form data into `req.body`
    var mongoose = require('mongoose');
    var winston = require('winston');
    var config = require('./server/config')();

    winston.level = config.winstonLevel;
    var mongoURL = config.datasourceUrl;
    winston.info('Starting Application in ' + config.environment + ' Environment');
    mongoose.connect(mongoURL);
    var db = mongoose.connection;
    db.on('error', function (error) {
        winston.error(error.message);
    });
    db.once('open', function () {
        winston.info('Connected with mongodb on ', mongoURL);
    });
    //CORS middleware
    var allowCrossDomain = function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    };

    app.use('/build', express.static('build'));
    app.use(express.static('node_modules'));
    app.use(allowCrossDomain);
    // configure the app to use bodyParser()
    app.use(bodyParser.urlencoded({
        limit: '50mb',
        extended: true
    }));
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(function (req, res, next) {
        winston.info("Request: ", req.url);
        next();
    });
    require('./server/routeMapping')(app);
    var server = app.listen(9000, function () {
        winston.info('TODO app listening at http://localhost:' + server.address().port);
    });
})(require);