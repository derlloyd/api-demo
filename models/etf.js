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

var Etf = mongoose.model('Etf', etfSchema);

// show all etfs function
function getEtfs(callback, limit) {
    // interact with db as if in MongoDB shell
    Etf.find(callback).limit(limit);
};

// add new etf function
function addEtf(etfObj, callback) {
    Etf.create(etfObj, callback);
}

// export all
module.exports = {
    Eft: Etf,
    getEtfs: getEtfs,
    addEtf: addEtf
}
