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
            applicationController.editApplication = function (application) {
                ngDialog.open({
                    templateUrl: 'editApplication.html',
                    controllerAs: 'editApplicationController',
                    controller: 'EditApplicationController',
                    className: 'ngdialog-theme-default',
                    data: application
                });
            };
            applicationController.showHistory = function (_id) {
                ngDialog.open({
                    templateUrl: 'showHistory.html',
                    controllerAs: 'showHistoryController',
                    controller: 'ShowHistoryController',
                    className: 'ngdialog-theme-default',
                    data: {_id: _id}
                });
            };
        }
    ]);
    applicationApp.controller('EditApplicationController', ['ApplicationService', '$scope',
        function (ApplicationService, $scope) {
            var editApplicationController = this;
            var resetApplicationDetails = function () {
                editApplicationController.name = $scope.ngDialogData.name;
                editApplicationController.status = $scope.ngDialogData.status;
                editApplicationController.metaData = $scope.ngDialogData.metaData;
            };
            editApplicationController.reset = function () {
                resetApplicationDetails();
            };
            editApplicationController.update = function () {
                ApplicationService.updateApplication($scope.ngDialogData._id, editApplicationController.name, editApplicationController.status, editApplicationController.metaData)
                    .success(function (response) {
                        resetApplicationDetails();
                        $scope.closeThisDialog();
                    })
                    .error(function (error) {
                        console.log(error);
                    });
            };
            resetApplicationDetails();
        }
    ]);
    applicationApp.controller('ShowHistoryController', ['ApplicationService', '$scope',
        function (ApplicationService, $scope) {
            var showHistoryController = this;
            ApplicationService.getApplicationHistory($scope.ngDialogData._id)
                .success(function (response) {
                    showHistoryController.histories = response.history;
                })
                .error(function (error) {

                });
        }
    ]);
})(angular, require);