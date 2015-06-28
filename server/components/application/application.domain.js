/**
 * Created by Amit Thakkar on 13/06/15.
 */
(function (require, module) {
    var mongoose = require('mongoose');
    var applicationSchema = mongoose.Schema({
        name: {type: String},
        status: {type: String},
        metaData: {type: String},
        history: [{
            name: {type: String},
            status: {type: String},
            metaData: {type: String},
            isRemoved: {type: Boolean, default: false}
        }],
        isRemoved: {type: Boolean, default: false},
        createdAt: {type: Number, required: true, default: Date.now}
    });
    applicationSchema.static('findOneById', function (_id, callback) {
        this.findOne({_id: _id, isRemoved: false}, {isRemoved: 0, history: 0}).lean().exec(callback);
    });
    applicationSchema.static('findAll', function (callback) {
        this.find({isRemoved: false}, {isRemoved: 0, history: 0}).lean().exec(callback);
    });
    applicationSchema.static('removeOneById', function (_id, callback) {
        this.update({_id: _id}, {$set: {isRemoved: true}}, callback);
    });
    applicationSchema.static('updateById', function (updateApplicationDetails, callback) {
        var self = this;
        var _id = updateApplicationDetails._id;
        delete updateApplicationDetails._id;
        self.findOneById(_id, function (error, application) {
            if (error) {
                callback(error);
            } else {
                delete application.isRemoved;
                delete application._id;
                self.update({_id: _id, isRemoved: false}, {
                    $set: updateApplicationDetails,
                    $push: {history: application}
                }, callback);
            }
        });
    });
    module.exports = mongoose.model('Application', applicationSchema);
})(require, module);