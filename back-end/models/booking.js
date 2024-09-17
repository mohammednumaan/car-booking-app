const mongoose = require("mongoose");
const Scheme = mongoose.Schema;

const BookingSchema = new Scheme({
  first: { type: String, required: true },
  last: { type: String, required: true },
  email: { type: String, required: true },

  pickLoc: { type: String, required: true },
  dropLoc: { type: String, required: true },

  arrival: { type: String, default: null},
  departure: { type: String, default: null},

  reference: { type: String, required: true },
  no_of_ppl: { type: Number, required: true },
  uploadStr: { type: String, required: true}


});

module.exports = mongoose.model("Booking", BookingSchema);