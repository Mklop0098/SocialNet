const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema(
{
    owner: {
        type: String,
        require: true
    },
    posts: {
        type: String,
        require: true
    },
    imgaes: Array,
    shared: Array,
    likes: Array,
    comments: Array,
    createAt: Date
},
);

module.exports = mongoose.model("posts", postsSchema);
