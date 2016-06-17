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

// show only 1 ETF
function getEtf(id, callback) {
    Etf.findOne(id, callback);
};

// add new etf function
function addEtf(etfObj, callback) {
    Etf.create(etfObj, callback);
}

// update an ETF
function updateEtf(id, obj, callback) {
    Etf.updateOne(id, obj, callback);
};

// delete an ETF
function deleteEtf(id, callback) {
    Etf.remove(id, callback);
};


// export all
module.exports = {
    model: Etf,
    getEtfs: getEtfs,
    getEtf: getEtf,
    addEtf: addEtf,
    updateEtf: updateEtf,
    deleteEtf: deleteEtf
}
