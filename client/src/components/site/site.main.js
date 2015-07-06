/**
 * Created by Amit Thakkar on 02/05/15.
 */
(function (ng, module) {
    'use strict';
    var exports = module.exports;
    exports.moduleName = 'angular-amd.site';
    try {
        exports.module = ng.module(exports.moduleName);
    } catch (e) {
        exports.module = ng.module(exports.moduleName, []);
    }
    exports.routes = [
        {
            url: '/site',
            templateUrl: 'src/components/site/_site{{now}}.html',
            controller: 'SiteController',
            controllerAs: 'siteController',
            deps: ['src/components/site/site.controller{{now}}.js']
        }
    ];
})(angular, module);