/**
 * Created by Amit Thakkar on 13/06/15.
 */
(function (module, require) {
    var EmployeeController = require('./employee.controller');
    module.exports = function (app) {
        app.get('/employee/:id', EmployeeController.get);
        app.get('/employee', EmployeeController.list);
        app.post('/employee', EmployeeController.save);
        app.put('/employee', EmployeeController.update);
        app.delete('/employee/:id', EmployeeController.remove);
    };
})(module, require);