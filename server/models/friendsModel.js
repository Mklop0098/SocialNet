const mongoose = require("mongoose");

const friendsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  friendList: Array,
  requestList: Array,
});

module.exports = mongoose.model("Friends", friendsSchema);
