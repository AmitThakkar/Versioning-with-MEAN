/**
 * Created by Amit Thakkar on 13/06/15.
 */
(function (require, module) {
    var mongoose = require('mongoose');
    var sitesSchema = mongoose.Schema({
        sheetName: {type: String, trim: true, required: 'Sheet Name cannot be blank'},
        metaData: {type: String, trim: true, required: 'Meta-Data cannot be blank'},
        isRemoved: {type: Boolean, default: false},
        current: {type: Boolean, default: true},
        version: {type: Number, default: 1},
        createdAt: {type: Number, required: true, default: Date.now}
    });
    sitesSchema.static('findOneById', function (_id, callback) {
        this.findOne({_id: _id, isRemoved: false, current: true}, {isRemoved: 0}).lean().exec(callback);
    });
    sitesSchema.static('findAllHistoryBySheetName', function (sheetName, callback) {
        this.findOne({sheetName: sheetName, isRemoved: false}, {isRemoved: 0}, {version: -1}).lean().exec(callback);
    });
    sitesSchema.static('findAll', function (callback) {
        this.find({isRemoved: false, current: true}, {isRemoved: 0}).lean().exec(callback);
    });
    sitesSchema.static('removeOneById', function (_id, callback) {
        this.update({_id: _id}, {$set: {isRemoved: true}}, callback);
    });
    sitesSchema.static('updateBySheetName', function (updateSiteDetails, callback) {
        var self = this;
        self.findOneAndUpdate({
            sheetName: updateSiteDetails.sheetName,
            current: true
        }, {$set: {current: false}}, function (error, site) {
            if (error) {
                callback(error);
            } else {
                new Site({
                    sheetName: updateSiteDetails.sheetName,
                    version: site.version + 1,
                    metaData: updateSiteDetails.metaData
                }).save(callback);
            }
        });
    });
    sitesSchema.index({ sheetName: 1, version: 1}, { unique: true });
    var Site = mongoose.model('Site', sitesSchema);
    module.exports = Site;
})(require, module);