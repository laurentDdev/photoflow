const mongoose = require("mongoose")

const _userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "avatar"
    },
    accountType: {
        type: String,
        default: "free"
    }
})

module.exports = mongoose.model("User", _userSchema)