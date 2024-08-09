const _userRoute = require("express").Router();
const _userController = require("../_controllers/_user.controller")
const _jwtMiddleware = require("../_middleware/_jwt.middleware")

_userRoute.get("/notifications", _jwtMiddleware,_userController.getNotifications);

module.exports = _userRoute