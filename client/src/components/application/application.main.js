/**
 * Created by Amit Thakkar on 02/05/15.
 */
(function (ng, module) {
    'use strict';
    var exports = module.exports;
    exports.moduleName = 'angular-amd.application';
    try {
        exports.module = ng.module(exports.moduleName);
    } catch (e) {
        exports.module = ng.module(exports.moduleName, []);
    }
    exports.routes = [
        {
            url: '/application',
            templateUrl: 'src/components/application/_application{{now}}.html',
            controller: 'ApplicationController',
            controllerAs: 'applicationController',
            deps: ['src/components/application/application.controller{{now}}.js']
        }
    ];
})(angular, module);