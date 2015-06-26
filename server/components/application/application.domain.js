/**
 * Created by AMit Thakkar on 13/06/15.
 */
(function (require, module) {
    var mongoose = require('mongoose');
    var applicationSchema = mongoose.Schema({
        name: String,
        status: String,
        metaData: String
    });
    applicationSchema.static('findOneById', function (id, callback) {
        this.findOne({_id: id}, callback);
    });
    applicationSchema.static('removeOneById', function (id, callback) {
        this.remove({_id: id}, callback);
    });
    applicationSchema.static('updateById', function (updateApplicationDetails, callback) {
        var id = updateApplicationDetails.id;
        delete updateApplicationDetails.id;
        this.update({_id: id}, {$set: updateApplicationDetails}, callback);
    });
    module.exports = mongoose.model('Application', applicationSchema);
})(require, module);