/**
 * Created by Amit Thakkar on 13/06/15.
 */
(function (module, require) {
    var ApplicationController = require('./application.controller');
    module.exports = function (app) {
        app.get('/application/:_id', ApplicationController.get);
        app.get('/application', ApplicationController.list);
        app.post('/application', ApplicationController.save);
        app.put('/application', ApplicationController.update);
        app.delete('/application/:_id', ApplicationController.remove);
        app.get('/application/history/:_id', ApplicationController.history);
    };
})(module, require);