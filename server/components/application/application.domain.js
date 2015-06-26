/**
 * Created by AMit Thakkar on 13/06/15.
 */
(function (require, module) {
    var mongoose = require('mongoose');
    var applicationSchema = mongoose.Schema({
        name: String,
        status: String,
        metaData: String,
        isRemoved: {type: Boolean, default: false}
    });
    applicationSchema.static('findOneById', function (id, callback) {
        this.findOne({_id: id, isRemoved: false}, {isRemoved: 0},callback);
    });
    applicationSchema.static('findAll', function (callback) {
        this.find({isRemoved: false}, {isRemoved: 0}, callback);
    });
    applicationSchema.static('removeOneById', function (id, callback) {
        this.update({_id: id}, {$set: {isRemoved: true}}, callback);
    });
    applicationSchema.static('updateById', function (updateApplicationDetails, callback) {
        var id = updateApplicationDetails.id;
        delete updateApplicationDetails.id;
        this.update({_id: id, isRemoved: false}, {$set: updateApplicationDetails}, callback);
    });
    module.exports = mongoose.model('Application', applicationSchema);
})(require, module);