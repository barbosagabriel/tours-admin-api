var mongoose = require("mongoose");

var ServiceSchema = mongoose.Schema(
  {
    name: String,
    shortDescription: String,
    description: String,
    price: Number,
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Service", ServiceSchema);
