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

var Advisor = mongoose.model('Advisor', advisorSchema);

// show all advisors function
function getAdvisors(callback, limit) {
    // interact with db as if in MongoDB shell
    Advisor.find(callback).limit(limit);
};

// add new advisor function
function addAdvisor(advisorObj, callback) {
    Advisor.create(advisorObj, callback);
}

// export all
module.exports = {
    Advisor: Advisor,
    getAdvisors: getAdvisors,
    addAdvisor: addAdvisor
}
