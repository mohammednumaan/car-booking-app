const mongoose = require("mongoose");
const Scheme = mongoose.Schema;

const UserSchema = new Scheme({
  username: { type: String, required: true },
  email : {type : String},
  staffID : {type : Number},
  phonenumber: {type : Number},
  salt: { type: String },
  hash: { type: String },
  isAdmin: {type: Boolean, default: false}
});

module.exports = mongoose.model("Users", UserSchema);