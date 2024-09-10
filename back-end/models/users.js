const mongoose = require("mongoose");
const Scheme = mongoose.Schema;

const UserSchema = new Scheme({
  username: { type: String, required: true },
  salt: { type: String },
  hash: { type: String },
});

module.exports = mongoose.model("Users", UserSchema);