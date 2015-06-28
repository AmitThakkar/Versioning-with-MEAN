/**
 * Created by amitthakkar on 02/05/15.
 */
(function (ng) {
    'use strict';
    var applicationApp = ng.module(require('./application.main.js').moduleName);
    applicationApp.service("ApplicationService", ['$http', function ($http) {
        var URL = '/application';
        this.addApplication = function (name, status, metaData) {
            return $http.post(URL, {
                name: name,
                status: status,
                metaData: metaData
            });
        };
        this.updateApplication = function (_id, name, status, metaData) {
            return $http.put(URL, {
                _id: _id,
                name: name,
                status: status,
                metaData: metaData
            });
        };
        this.getApplicationList = function () {
            return $http.get(URL);
        };
        this.getApplicationHistory = function (_id) {
            return $http.get(URL + "/history/" + _id);
        };
    }]);
})(angular);