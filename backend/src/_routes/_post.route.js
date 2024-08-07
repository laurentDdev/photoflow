const _postRoute = require("express").Router();
const _postController = require("../_controllers/_post.controller");
const _jwtMiddleware = require("../_middleware/_jwt.middleware");
const multer = require("multer");
const storage = require("../multer.config")("posts");

const upload = multer({storage: storage});

_postRoute.post("/", _jwtMiddleware,upload.single("image"),_postController.create)
_postRoute.get("/", _jwtMiddleware, _postController.findAll)

module.exports = _postRoute;