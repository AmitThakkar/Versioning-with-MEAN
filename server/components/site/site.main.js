/**
 * Created by Amit Thakkar on 13/06/15.
 */
(function (module, require) {
    var SiteController = require('./site.controller');
    module.exports = function (app) {
        app.get('/site/:_id', SiteController.get);
        app.get('/site', SiteController.list);
        app.post('/site', SiteController.save);
        app.put('/site', SiteController.update);
        app.delete('/site/:_id', SiteController.remove);
        app.get('/site/history/:sheetName', SiteController.history);
    };
})(module, require);