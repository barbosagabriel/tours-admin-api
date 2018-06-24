var mongoose = require('mongoose');

var ServiceSchema = mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }
});

module.exports = mongoose.model('Service', ServiceSchema);