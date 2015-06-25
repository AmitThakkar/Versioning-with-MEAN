/**
 * Created by Amit Thakkar on 13/06/15.
 */
(function (require, module) {
    var mongoose = require('mongoose');
    var historySchema = mongoose.Schema({
        userId: String,
        lname: String,
        age: Number
    });
    historySchema.static('findOneById', function (id, callback) {
        this.findOne({_id: id}, callback);
    });
    historySchema.static('removeOneById', function (id, callback) {
        this.remove({_id: id}, callback);
    });
    historySchema.static('updateById', function (updateHistoryDetails, callback) {
        var id = updateHistoryDetails.id;
        delete updateHistoryDetails.id;
        this.update({_id: id}, {$set: updateHistoryDetails}, callback);
    });
    module.exports = mongoose.model('History', historySchema);
})(require, module);