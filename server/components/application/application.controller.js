/**
 * Created by Amit Thakkar on 13/06/15.
 */

(function (require, module) {
    var winston = require('winston');
    var Application = require('./application.domain');
    module.exports.get = function (req, res) {
        var _id = req.params._id;
        Application.findOneById(_id, function (error, user) {
            if (error) {
                winston.error(error);
                res.status(500).json(error);
            } else if (!user) {
                res.status(404).send("No record found with " + _id);
            } else {
                res.status(200).json(user);
            }
        });
    };
    module.exports.list = function (req, res) {
        Application.findAll(function (error, users) {
            if (error) {
                winston.error(error);
                res.status(500).json(error);
            } else if (!users) {
                res.status(404).send("No record found with in User Collection");
            } else {
                res.status(200).json(users);
            }
        });
    };
    module.exports.remove = function (req, res) {
        var _id = req.params._id;
        Application.removeOneById(_id, function (error, user) {
            if (error) {
                winston.error(error);
                res.status(500).json(error);
            } else if (!user) {
                res.status(404).send("No record found with " + _id);
            } else {
                res.status(200).json(user);
            }
        });
    };
    module.exports.save = function (req, res) {
        var newApplicationDetails = req.body;
        winston.silly('Saving User: ', newApplicationDetails);
        new Application({
            name: newApplicationDetails.name,
            status: newApplicationDetails.status,
            metaData: newApplicationDetails.metaData
        }).save(function (error, user) {
                if (error) {
                    winston.error(error);
                    res.status(500).json(error);
                } else {
                    res.status(200).json(user);
                }
            });
    };
    module.exports.update = function (req, res) {
        var updateApplicationDetails = req.body;
        winston.silly('Updating User: ', updateApplicationDetails);
        Application.updateById(updateApplicationDetails, function(error, isUpdated) {
            if (error) {
                winston.error(error);
                res.status(500).json(error);
            } else if (!isUpdated) {
                res.status(404).send("No record found with " + updateApplicationDetails._id);
            } else {
                res.status(200).json("User Updated");
            }
        });
    };
})(require, module);