/**
 * Created by Amit Thakkar on 13/06/15.
 */
(function (module, require) {
    var ApplicationController = require('./application.controller');
    module.exports = function (app) {
        app.get('/application/:id', ApplicationController.get);
        app.get('/application', ApplicationController.list);
        app.post('/application', ApplicationController.save);
        app.put('/application', ApplicationController.update);
        app.delete('/application/:id', ApplicationController.remove);
    };
})(module, require);