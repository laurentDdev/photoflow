const router = require('express').Router();
const _authRoutes = require("./_auth.route");

router.use("/auth", _authRoutes)


module.exports = router;