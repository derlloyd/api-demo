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

// show only 1 Advisor
function getAdvisor(id, callback) {
    Advisor.findOne(id, callback);
};

// add new advisor function
function addAdvisor(advisorObj, callback) {
    Advisor.create(advisorObj, callback);
}

// update an Advisor
function updateAdvisor(id, obj, callback) {
    Advisor.updateOne(id, obj, callback);
};

// delete an Advisor
function deleteAdvisor(id, callback) {
    Advisor.remove(id, callback);
};


// export all
module.exports = {
    model: Advisor,
    getAdvisors: getAdvisors,
    getAdvisor: getAdvisor,
    addAdvisor: addAdvisor,
    updateAdvisor: updateAdvisor,
    deleteAdvisor: deleteAdvisor
}
