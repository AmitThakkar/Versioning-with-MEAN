/**
 * Created by Amit Thakkar on 13/06/15.
 */

(function (require, module) {
    var winston = require('winston');
    var Site = require('./site.domain');
    module.exports.history = function (req, res) {
        var sheetName = req.params.sheetName;
        Site.findAllHistoryBySheetName(sheetName, function (error, sites) {
            if (error) {
                winston.error(error);
                res.status(500).json(error);
            } else if (!sites) {
                res.status(404).send("No record found with " + sheetName);
            } else {
                res.status(200).json(sites);
            }
        });
    };
    module.exports.list = function (req, res) {
        Site.findAll(function (error, sites) {
            if (error) {
                winston.error(error);
                res.status(500).json(error);
            } else if (!sites) {
                res.status(404).send("No record found with in Site Collection");
            } else {
                res.status(200).json(sites);
            }
        });
    };
    module.exports.sheetNameAndVersion = function (req, res) {
        Site.findAllSheetNameAndVersion(function (error, sites) {
            if (error) {
                winston.error(error);
                res.status(500).json(error);
            } else if (!sites) {
                res.status(404).send("No record found with in Site Collection");
            } else {
                res.status(200).json(sites);
            }
        });
    };
    module.exports.remove = function (req, res) {
        var _id = req.params._id;
        Site.removeOneById(_id, function (error, site) {
            if (error) {
                winston.error(error);
                res.status(500).json(error);
            } else if (!site) {
                res.status(404).send("No record found with " + _id);
            } else {
                res.status(200).json(site);
            }
        });
    };
    module.exports.save = function (req, res) {
        var newSheetDetails = req.body;
        winston.silly('Saving Site: ', newSheetDetails);
        Site.saveNewSheetDetails(newSheetDetails, function (error, site) {
            if (error) {
                winston.error(error);
                res.status(500).json(error);
            } else {
                res.status(200).json(site);
            }
        });
    };
})(require, module);