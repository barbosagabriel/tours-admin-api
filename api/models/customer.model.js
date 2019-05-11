var mongoose = require("mongoose");

var CustomerSchema = mongoose.Schema(
  {
    name: String,
    firstName: String,
    lastName: String,
    identificationNumber: String,
    email: String,
    phone: String,
    phoneSecondary: String,
    postalCode: String,
    address: String,
    addressLine2: String,
    addressNumber: Number,
    addressNeighbourhood: String,
    city: String,
    state: String,
    country: String,
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Customer", CustomerSchema);
