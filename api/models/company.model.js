const mongoose = require('mongoose');

const CompanySchema = mongoose.Schema({
    name: String,
    email: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Company', CompanySchema);