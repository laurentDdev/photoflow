const _authRoute  = require("express").Router();
const _authController = require("../_controllers/_auth.controller")

_authRoute.post('/login', _authController.login);

_authRoute.post('/register', _authController.register);

_authRoute.get("/me", _authController.me)

_authRoute.delete("/", _authController.logout)

module.exports = _authRoute;
