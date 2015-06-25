/**
 * Created by Amit Thakkar on 02/05/15.
 */
(function (ng, module) {
    'use strict';
    var exports = module.exports;
    exports.moduleName = 'angular-amd.home';
    try {
        exports.module = ng.module(exports.moduleName);
    } catch(e) {
        exports.module = ng.module(exports.moduleName, []);
    }
    exports.routes = [
        {
            url: '/home',
            templateUrl: 'src/components/home/_home{{now}}.html',
            controller: 'HomeController',
            controllerAs: 'homeController',
            deps: ['src/components/home/home.controller{{now}}.js']
        }
    ];
})(angular, module);