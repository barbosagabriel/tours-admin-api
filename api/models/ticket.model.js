var mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

var TicketSchema = mongoose.Schema(
  {
    number: Number,
    date: Date,
    participants: Number,
    subTotal: Number,
    discount: Number,
    total: Number,
    extraInformation: String,
    notes: String,
    paymentInformation: String,
    customerHotel: String,
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company"
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer"
    },
    guide: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    responsible: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service"
    }
  },
  {
    timestamps: true
  }
);

TicketSchema.plugin(autoIncrement, { inc_field: "number" });

module.exports = mongoose.model("Ticket", TicketSchema);
