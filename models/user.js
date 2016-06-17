var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
// TODO hash the password using bcrypt

var User = mongoose.model('User', userSchema);

// export
module.exports = User
