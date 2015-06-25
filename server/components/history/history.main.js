/**
 * Created by Amit Thakkar on 13/06/15.
 */
(function (module, require) {
    var HistoryController = require('./history.controller');
    module.exports = function (app) {
        app.get('/history/:id', HistoryController.get);
        app.get('/history', HistoryController.list);
        app.post('/history', HistoryController.save);
        app.put('/history', HistoryController.update);
        app.delete('/history/:id', HistoryController.remove);
    };
})(module, require);