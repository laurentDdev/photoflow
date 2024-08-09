const router = require('express').Router();
const _authRoutes = require("./_auth.route");
const _postRoutes = require("./_post.route");
const _userRoutes = require("./_user.route")

router.use("/auth", _authRoutes)
router.use("/posts", _postRoutes)
router.use("/users", _userRoutes)


module.exports = router;