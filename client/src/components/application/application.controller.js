/**
 * Created by Amit Thakkar on 02/05/15.
 */
(function (ng, require) {
    'use strict';
    var applicationApp = ng.module(require('./application.main.js').moduleName);
    require('./application.service.js');
    applicationApp.controller('ApplicationController', ['ApplicationService', function (ApplicationService) {
        var applicationController = this;
        applicationController.addApplication = function () {
            ApplicationService.addApplication(applicationController.name, applicationController.status, applicationController.metaData)
                .success(function (response) {
                    console.log(response)
                })
                .error(function (error) {
                    console.log(error);
                });
        };
    }]);
})(angular, require);