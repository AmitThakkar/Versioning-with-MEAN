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
    sitesSchema.static('findAllHistoryBySheetName', function (sheetName, callback) {
        this.find({
            sheetName: sheetName,
            isRemoved: false
        }, {isRemoved: 0}, {sort: {version: -1}}).lean().exec(callback);
    });
    sitesSchema.static('findAll', function (callback) {
        this.find({isRemoved: false, current: true}, {isRemoved: 0}).lean().exec(callback);
    });
    sitesSchema.static('findAllSheetNameAndVersion', function (callback) {
        this.find({isRemoved: false, current: true}, {sheetName: 1, version: 1, _id: 0}).lean().exec(callback);
    });
    sitesSchema.static('removeOneById', function (_id, callback) {
        this.update({_id: _id}, {$set: {isRemoved: true}}, callback);
    });
    sitesSchema.static('saveNewSheetDetails', function (newSheetDetails, callback) {
        var self = this;
        self.findOneAndUpdate({
            sheetName: newSheetDetails.sheetName,
            current: true
        }, {$set: {current: false}}, function (error, site) {
            if (error) {
                callback(error);
            } else {
                var version = 1;
                if(site) {
                    version = site.version + 1;
                }
                new Site({
                    sheetName: newSheetDetails.sheetName,
                    version: version,
                    metaData: newSheetDetails.metaData
                }).save(callback);
            }
        });
    });
    sitesSchema.index({sheetName: 1, version: 1}, {unique: true});
    var Site = mongoose.model('Site', sitesSchema);
    module.exports = Site;
})(require, module);