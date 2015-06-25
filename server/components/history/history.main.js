/**
 * Created by Amit Thakkar on 13/06/15.
 */
(function (module, require) {
    var EmployeeController = require('./history.controller');
    module.exports = function (app) {
        app.get('/history/:id', EmployeeController.get);
        app.get('/history', EmployeeController.list);
        app.post('/history', EmployeeController.save);
        app.put('/history', EmployeeController.update);
        app.delete('/history/:id', EmployeeController.remove);
    };
})(module, require);