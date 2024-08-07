const router = require('express').Router();
const _authRoutes = require("./_auth.route");
const _postRoutes = require("./_post.route");

router.use("/auth", _authRoutes)
router.use("/posts", _postRoutes)


module.exports = router;