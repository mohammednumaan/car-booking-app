const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  first: { type: String, required: true },
  last: { type: String, required: true },
  email: { type: String, required: true },

  pickLoc: { type: String, required: true },
  dropLoc: { type: String, required: true },

  arrival: {type: String},
  dualTrip: {start: String, end: String, default: {}},

  reference: { type: String, required: true },
  no_of_ppl: { type: Number, required: true },
  img: { type: String, required: true, default: " "},

  user: {type: Schema.Types.ObjectId, required: true},
  isOnGoing: {type: Boolean, default: true},
  bookingStatus: {type: String, default: "Pending"},

  driverAlloted: {type: String, default: null},
  driverNumber: {type: Number, default: null}


});

module.exports = mongoose.model("Booking", BookingSchema);