const _notification = require("../_models/_notification.model")
const _post = require("../_models/_post.model")
const bcrypt = require('bcrypt');
const _user = require('../_models/_user.model');

const _userService = {
    getNotifications: async (userId) => {
        const userNotification = await _notification.find({receiver: userId}).populate("sender", "username avatar").populate("receiver", "username avatar").sort({createdAt: -1}).limit(20).exec();
        return userNotification;
    },

    updateProfile: async (userId, username, avatar, newPassword) => {
        const user = await _user.findById(userId).exec();
        user.username = username;
        user.avatar = avatar;
        if (newPassword) {
            user.password = bcrypt.hashSync(newPassword, 10);
        }
        const updatedUser = await user.save();
        return updatedUser;
    }
}

module.exports = _userService;