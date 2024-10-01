const mongoose = require("mongoose");

const notifySchema = new mongoose.Schema(
{
    userId: {
        type: String,
        require: true
    },
    notify: Array,
},
);

module.exports = mongoose.model("notify", notifySchema);
