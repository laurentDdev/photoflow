const _userRoute = require("express").Router();
const _userController = require("../_controllers/_user.controller")
const _jwtMiddleware = require("../_middleware/_jwt.middleware")

const multer = require("multer");
const storage = require("../multer.config")("avatars");

const upload = multer({storage: storage});

_userRoute.get("/notifications", _jwtMiddleware,_userController.getNotifications);
_userRoute.put("/profile", _jwtMiddleware,upload.single("avatar"),_userController.updateProfile);

module.exports = _userRoute