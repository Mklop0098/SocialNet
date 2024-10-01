const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    min: 3,
    max: 20,
    required: true,
  },
  lastName: {
    type: String,
    min: 3,
    max: 20,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  backgroundImage: String,
  avatar: String
});

module.exports = mongoose.model("Users", userSchema);
