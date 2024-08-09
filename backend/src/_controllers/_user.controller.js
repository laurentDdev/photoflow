const _userService = require("../_services/_user.service")

const _userController = {
    getNotifications: async (req, res) => {
        try {
            const userId = req.userId
            const notifcaiions = await _userService.getNotifications(userId);

            res.status(200).json(notifcaiions)

        }catch (e) {

        }
    }
}


module.exports = _userController;