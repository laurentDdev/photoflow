const mongoose = require("mongoose")

const _commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    likes: {
        type: Number,
        default: 0
    },
    replies: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Comment"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Comment = mongoose.model("Comment", _commentSchema)

module.exports = Comment;