var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }
});

module.exports = mongoose.model('User', UserSchema);