const mongoose = require("mongoose");

const CompanySchema = mongoose.Schema(
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
    zipcode: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Company", CompanySchema);