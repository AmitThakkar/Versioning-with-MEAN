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
    }]);
})(angular);