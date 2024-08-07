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
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User"
    },
    comments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Comment",
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Post = mongoose.model("Post", _postSchema)

module.exports = Post;