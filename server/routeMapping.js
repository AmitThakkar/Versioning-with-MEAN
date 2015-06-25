/**
 * Created by Amit Thakkar on 25/05/15.
 */
(function (module, require) {
    module.exports = function (app) {
        require('./components/employee/employee.main')(app);
        require('./components/history/history.main')(app);
    };
})(module, require);