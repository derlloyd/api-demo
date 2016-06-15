var mongoose = require('mongoose');

// sets the required fields for entries into the db
var etfSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ticker: {
        type: String,
        required: true
    }
})

var Etf = module.exports = mongoose.model('Etf', etfSchema);

// show all etfs function
module.exports.getEtfs = function(callback, limit) {
    // interact with db as if in MongoDB shell
    Etf.find(callback).limit(limit);
};