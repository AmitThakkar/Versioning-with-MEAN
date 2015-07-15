/**
 * Created by Amit Thakkar on 15/07/15.
 */
(function (process) {
    var exports = module.exports = function () {
        var config = {};
        switch (process.env.NODE_ENV) {
            case 'DEV':
                config.datasourceUrl = 'mongodb://localhost/history';
                config.winstonLevel = 'silly';
                config.environment = 'DEV';
                break;
            default :
                config.datasourceUrl = 'mongodb://localhost/history';
                config.winstonLevel = 'info';
                config.environment = 'PROD';
                break;
        }
        return config;
    }
})(process);