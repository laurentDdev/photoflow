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
    favorites: {
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

module.exports = mongoose.model("Post", _postSchema);