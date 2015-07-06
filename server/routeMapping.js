/**
 * Created by Amit Thakkar on 25/05/15.
 */
(function (module, require) {
    module.exports = function (app) {
        require('./components/application/application.main')(app);
        require('./components/site/site.main')(app);
    };
})(module, require);