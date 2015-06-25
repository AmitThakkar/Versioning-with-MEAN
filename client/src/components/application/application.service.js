/**
 * Created by amitthakkar on 02/05/15.
 */
(function (ng) {
    'use strict';
    var applicationApp = ng.module(require('./application.main.js').moduleName);
    applicationApp.service("ApplicationService", [function () {
        this.getName = function() {
            return "Application Service";
        };
    }]);
})(angular);