/**
 * Created by Amit Thakkar on 02/05/15.
 */
(function (require, module) {
    require('./shared/js-libs');
    require('./shared/angular-libs');
    var MAIN_APP_MODULE = "angular-amd";
    var exports = module.exports;
    var externalModules = [
        'ngRoute',
        'ngDialog'
    ];
    // If your module have route configuration then push module main file to moduleMainFiles.
    var moduleMainFiles = [
        require('./components/home/home.main'),
        require('./components/application/application.main')
    ];
    // If your module have not route configuration then don't neet push module to internalModuleObjects.
    var withoutRouteMainFiles = [
        require('./shared/common.main')
    ];

    var internalModules = [];
    var internalModuleObjects = [];
    moduleMainFiles.forEach(function (moduleMainFile) {
        internalModules.push(moduleMainFile.moduleName);
        internalModuleObjects.push(moduleMainFile);
    });
    withoutRouteMainFiles.forEach(function (withoutRouteMainFile) {
        internalModules.push(withoutRouteMainFile.moduleName);
    });
    exports.mainAppModule = MAIN_APP_MODULE;
    exports.dependModules = externalModules.concat(internalModules);
    exports.internalModuleObjects = internalModuleObjects;
    exports.DEFAULT_URL = "/home";
})(require, module);