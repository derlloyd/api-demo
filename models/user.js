var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: String,
    password: String
})
// TODO hash the password using bcrypt

var User = mongoose.model('User', userSchema);

// export
module.exports = User
