const mongoose = require("mongoose")

const _postSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: {
        type: Array,
        default: []
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const Post = mongoose.model("Post", _postSchema)

module.exports = Post;