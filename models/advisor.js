var mongoose = require('mongoose');

// sets the required fields for entries into the db
var advisorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    firm: {
        type: String,
        required: true
    }
})

var Advisor = module.exports = mongoose.model('Advisor', advisorSchema);

// show all advisors function
module.exports.getAdvisors = function(callback, limit) {
    // interact with db as if in MongoDB shell
    Advisor.find(callback).limit(limit);
};