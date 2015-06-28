/**
 * Created by Amit Thakkar on 02/05/15.
 */
(function (ng, require) {
    'use strict';
    var applicationApp = ng.module(require('./application.main.js').moduleName);
    require('./application.service.js');
    applicationApp.controller('ApplicationController', ['ApplicationService', 'ngDialog',
        function (ApplicationService, ngDialog) {
            var applicationController = this;
            var clearNewApplicationDetails = function () {
                applicationController.name = undefined;
                applicationController.status = undefined;
                applicationController.metaData = undefined;
            };
            applicationController.addApplication = function () {
                ApplicationService.addApplication(applicationController.name, applicationController.status, applicationController.metaData)
                    .success(function (response) {
                        console.log(response);
                        clearNewApplicationDetails();
                    })
                    .error(function (error) {
                        console.log(error);
                    });
            };
            ApplicationService.getApplicationList()
                .success(function (applications) {
                    applicationController.applications = applications;
                })
                .error(function (error) {
                    console.log(error);
                });
            applicationController.editApplication = function (_id) {
                ngDialog.open({
                    templateUrl: 'editApplication.html',
                    controllerAs: 'editApplicationController',
                    controller: 'EditApplicationController',
                    className: 'ngdialog-theme-default',
                    data: {_id: _id}
                });
            };
        }]);
    applicationApp.controller('EditApplicationController', ['ApplicationService', '$scope', function (ApplicationService, $scope) {
        var editApplicationController = this;
        var clearEditApplicationDetails = function () {
            editApplicationController.name = undefined;
            editApplicationController.status = undefined;
            editApplicationController.metaData = undefined;
        };
        editApplicationController.reset = function () {
            clearEditApplicationDetails();
        };
        editApplicationController.update = function () {
            ApplicationService.updateApplication($scope.ngDialogData._id, editApplicationController.name, editApplicationController.status, editApplicationController.metaData)
                .success(function (response) {
                    console.log(response);
                    clearEditApplicationDetails();
                })
                .error(function (error) {
                    console.log(error);
                });
        };
    }]);
})(angular, require);