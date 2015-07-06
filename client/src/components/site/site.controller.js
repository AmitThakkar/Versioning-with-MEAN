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
    siteApp.controller('ShowSiteHistoryController', ['SiteService', '$scope',
        function (SiteService, $scope) {
            var showSiteHistoryController = this;
            SiteService.getSiteHistory($scope.ngDialogData.sheetName)
                .success(function (response) {
                    showSiteHistoryController.histories = response;
                })
                .error(function (error) {

                });
        }
    ]);
})(angular, require);