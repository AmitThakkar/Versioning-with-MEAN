/**
 * Created by Amit Thakkar on 13/06/15.
 */

(function (require, module) {
    var winston = require('winston');
    var Employee = require('./employee.domain');
    module.exports.get = function (req, res) {
        var id = req.params.id;
        Employee.findOneById(id, function (error, user) {
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
        Employee.find(function (error, users) {
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
        Employee.removeOneById(id, function (error, user) {
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
        var newEmployeeDetails = req.body;
        winston.silly('Saving User: ', newEmployeeDetails);
        new Employee({
            fname: newEmployeeDetails.fname,
            lname: newEmployeeDetails.lname,
            age: newEmployeeDetails.age
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
        var updateEmployeeDetails = req.body;
        winston.silly('Updating User: ', updateEmployeeDetails);
        Employee.updateById(updateEmployeeDetails, function(error, isUpdated) {
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