var mongoose = require("mongoose");

var CompanySchema = mongoose.Schema(
  {
    address: String,
    addressLine2: String,
    addressNumber: Number,
    city: String,
    corporateName: String,
    country: String,
    email: String,
    facebook: String,
    instagram: String,
    name: String,
    phone: String,
    phoneSecondary: String,
    state: String,
    website: String,
    zipcode: String,
    goalCustomersPerMonth: Number,
    goalTicketsPerMonth: Number
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Company", CompanySchema);
