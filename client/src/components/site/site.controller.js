/**
 * Created by Amit Thakkar on 02/05/15.
 */
(function (ng, require) {
    'use strict';
    var siteApp = ng.module(require('./site.main.js').moduleName);
    require('./site.service.js');
    siteApp.controller('SiteController', ['SiteService', 'ngDialog',
        function (SiteService, ngDialog) {
            var siteController = this;
            var clearNewSiteDetails = function () {
                siteController.sheetName = undefined;
                siteController.metaData = undefined;
            };
            siteController.addSite = function () {
                SiteService.addSite(siteController.sheetName, siteController.metaData)
                    .success(function (response) {
                        console.log(response);
                        clearNewSiteDetails();
                    })
                    .error(function (error) {
                        console.log(error);
                    });
            };
            SiteService.getSiteList()
                .success(function (sites) {
                    siteController.sites = sites;
                })
                .error(function (error) {
                    console.log(error);
                });
            siteController.editSite = function (site) {
                ngDialog.open({
                    templateUrl: 'editSite.html',
                    controllerAs: 'editSiteController',
                    controller: 'EditSiteController',
                    className: 'ngdialog-theme-default',
                    data: site
                });
            };
            siteController.showHistory = function (sheetName) {
                ngDialog.open({
                    templateUrl: 'showSiteHistory.html',
                    controllerAs: 'showSiteHistoryController',
                    controller: 'ShowSiteHistoryController',
                    className: 'ngdialog-theme-default',
                    data: {sheetName: sheetName}
                });
            };
        }
    ]);
    siteApp.controller('EditSiteController', ['SiteService', '$scope',
        function (SiteService, $scope) {
            var editSiteController = this;
            var resetSiteDetails = function () {
                editSiteController.sheetName = $scope.ngDialogData.sheetName;
                editSiteController.metaData = $scope.ngDialogData.metaData;
            };
            editSiteController.reset = function () {
                resetSiteDetails();
            };
            editSiteController.update = function () {
                SiteService.updateSite(editSiteController.sheetName, editSiteController.metaData)
                    .success(function (response) {
                        resetSiteDetails();
                        $scope.closeThisDialog();
                    })
                    .error(function (error) {
                        console.log(error);
                    });
            };
            resetSiteDetails();
        }
    ]);
    siteApp.controller('ShowSiteHistoryController', ['SiteService', '$scope',
        function (SiteService, $scope) {
            var showSiteHistoryController = this;
            SiteService.getSiteHistory($scope.ngDialogData.sheetName)
                .success(function (response) {
                    showSiteHistoryController.histories = response.history;
                })
                .error(function (error) {

                });
        }
    ]);
})(angular, require);