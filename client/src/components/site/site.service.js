/**
 * Created by amitthakkar on 02/05/15.
 */
(function (ng) {
    'use strict';
    var siteApp = ng.module(require('./site.main.js').moduleName);
    siteApp.service("SiteService", ['$http', function ($http) {
        var URL = '/site';
        this.addSite = function (sheetName, metaData) {
            return $http.post(URL, {
                sheetName: sheetName,
                metaData: metaData
            });
        };
        this.updateSite = function (sheetName, metaData) {
            return $http.put(URL, {
                sheetName: sheetName,
                metaData: metaData
            });
        };
        this.getSiteList = function () {
            return $http.get(URL);
        };
        this.getSiteHistory = function (_id) {
            return $http.get(URL + "/history/" + _id);
        };
    }]);
})(angular);