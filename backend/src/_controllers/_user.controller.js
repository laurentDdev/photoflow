const _userService = require("../_services/_user.service")

const _userController = {
    getNotifications: async (req, res) => {
        try {
            const userId = req.userId
            const notifcaiions = await _userService.getNotifications(userId);

            res.status(200).json(notifcaiions)

        }catch (e) {
            console.log(e)
            res.status(500).json({message: "Internal server error"})
        }
    },
    updateProfile: async (req, res) => {
        try {
            const userId = req.userId
            const {username, newPassword} = req.body
            const avatar = req.file && req.file.filename.split(".")[0];


            const updatedUser = await _userService.updateProfile(userId, username, avatar, newPassword);

            res.status(200).json(updatedUser)
        }catch (e) {
            console.log(e)
            res.status(500).json({message: "Internal server error"})
        }
    }
}


module.exports = _userController;