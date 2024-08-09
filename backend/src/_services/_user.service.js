const _notification = require("../_models/_notification.model")

const _userService = {
    getNotifications: async (userId) => {
        const userNotification = await _notification.find({receiver: userId}).populate("sender", "username avatar").populate("receiver", "username avatar").sort({createdAt: -1}).exec();
        return userNotification;
    }
}

module.exports = _userService;