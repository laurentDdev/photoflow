const _notification = require("../_models/_notification.model")
const _post = require("../_models/_post.model")

const _userService = {
    getNotifications: async (userId) => {
        const userNotification = await _notification.find({receiver: userId}).populate("sender", "username avatar").populate("receiver", "username avatar").sort({createdAt: -1}).limit(20).exec();
        return userNotification;
    },
}

module.exports = _userService;