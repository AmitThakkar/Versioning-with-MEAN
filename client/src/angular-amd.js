/**
 * Created by Amit Thakkar on 01/05/15.
 */
(function (require, window) {
    'use strict';
    var config = require('./config');
    var ng = window.angular;
    var $script = window.$script;

    var addDynamicBehaviourSupportToModule = function (internalModule) {
        internalModule.config(['$controllerProvider', '$provide', '$compileProvider', function ($controllerProvider, $provide, $compileProvider) {
            internalModule.controller = function (name, constructor) {
                $controllerProvider.register(name, constructor);
                return (this);
            };
            internalModule.service = function (name, constructor) {
                $provide.service(name, constructor);
                return (this);
            };
            internalModule.factory = function (name, factory) {
                $provide.factory(name, factory);
                return (this);
            };
            internalModule.value = function (name, value) {
                $provide.value(name, value);
                return (this);
            };
            internalModule.constant = function (name, value) {
                $provide.constant(name, value);
                return (this);
            };
            internalModule.directive = function (name, factory) {
                $compileProvider.directive(name, factory);
                return (this);
            };
        }]);
    };
    var routes = [];
    ng.forEach(config.internalModuleObjects, function (internalModuleObject) {
        routes = routes.concat(internalModuleObject.routes);
        addDynamicBehaviourSupportToModule(internalModuleObject.module);
    });

    var angularAMD = ng.module(config.mainAppModule, config.dependModules);
    angularAMD.config(['$routeProvider', function ($routeProvider) {
        var loadDependencies = function ($q, deps) {
            var deferred = $q.defer();
            $script(deps, function (error) {
                if (error) {
                    deferred.reject(error);
                } else {
                    deferred.resolve('Success');
                }
            });
            return deferred.promise;
        };
        ng.forEach(routes, function (route) {
            if (route.deps) {
                if (!route.resolve) {
                    route.resolve = {};
                }
                route.resolve.deps = ['$q', function ($q) {
                    return loadDependencies($q, route.deps);
                }];
            }
            $routeProvider.when(route.url, route)
        });
        $routeProvider.otherwise({
            redirectTo: config.DEFAULT_URL
        });
    }]);
    require('../../temp/environment.config')
})(require, window);