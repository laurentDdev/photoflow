const jwt = require('jsonwebtoken');


const _jwtMiddleware = (req, res, next) => {
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET)

    if (decoded) {
        req.userId = decoded.sub;
        next();
    } else {
        res.status(401).json({message: "Unauthorized"})
    }
}

module.exports = _jwtMiddleware;