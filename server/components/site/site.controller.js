/**
 * Created by Amit Thakkar on 13/06/15.
 */

(function (require, module) {
    var winston = require('winston');
    var Site = require('./site.domain');
    module.exports.get = function (req, res) {
        var _id = req.params._id;
        Site.findOneById(_id, function (error, site) {
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
        var newApplicationDetails = req.body;
        winston.silly('Saving Site: ', newApplicationDetails);
        new Site({
            sheetName: newApplicationDetails.sheetName,
            metaData: newApplicationDetails.metaData
        }).save(function (error, site) {
                if (error) {
                    winston.error(error);
                    res.status(500).json(error);
                } else {
                    res.status(200).json(site);
                }
            });
    };
    module.exports.update = function (req, res) {
        var updateSiteDetails = req.body;
        winston.silly('Updating Site: ', updateSiteDetails);
        Site.updateBySheetName(updateSiteDetails, function(error, isUpdated) {
            if (error) {
                winston.error(error);
                res.status(500).json(error);
            } else if (!isUpdated) {
                res.status(404).send("No record found with " + updateSiteDetails._id);
            } else {
                res.status(200).json("Site Updated");
            }
        });
    };
})(require, module);