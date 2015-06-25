/**
 * Created by Amit Thakkar on 13/06/15.
 */

(function (require, module) {
    var winston = require('winston');
    var History = require('./history.domain');
    module.exports.get = function (req, res) {
        var id = req.params.id;
        History.findOneById(id, function (error, user) {
            if (error) {
                winston.error(error);
                res.status(500).json(error);
            } else if (!user) {
                res.status(404).send("No record found with " + id);
            } else {
                res.status(200).json(user);
            }
        });
    };
    module.exports.list = function (req, res) {
        History.find(function (error, users) {
            if (error) {
                winston.error(error);
                res.status(500).json(error);
            } else if (!users) {
                res.status(404).send("No record found with " + id);
            } else {
                res.status(200).json(users);
            }
        });
    };
    module.exports.remove = function (req, res) {
        var id = req.params.id;
        History.removeOneById(id, function (error, user) {
            if (error) {
                winston.error(error);
                res.status(500).json(error);
            } else if (!user) {
                res.status(404).send("No record found with " + id);
            } else {
                res.status(200).json(user);
            }
        });
    };
    module.exports.save = function (req, res) {
        var newHistoryDetails = req.body;
        winston.silly('Saving User: ', newHistoryDetails);
        new History({
            fname: newHistoryDetails.fname,
            lname: newHistoryDetails.lname,
            age: newHistoryDetails.age
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
        var updateHistoryDetails = req.body;
        winston.silly('Updating User: ', updateHistoryDetails);
        History.updateById(updateHistoryDetails, function(error, isUpdated) {
            if (error) {
                winston.error(error);
                res.status(500).json(error);
            } else if (!isUpdated) {
                res.status(404).send("No record found with " + id);
            } else {
                res.status(200).json("User Updated");
            }
        });
    };
})(require, module);