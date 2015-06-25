/**
 * Created by Amit Thakkar on 02/05/15.
 */
(function (ng, require) {
    'use strict';
    var homeApp = ng.module(require('./home.main.js').moduleName);
    homeApp.controller('HomeController', [function () {
        var homeController = this;
        homeController.page = 'Welcome in Revesioning!';
    }]);
})(angular, require);