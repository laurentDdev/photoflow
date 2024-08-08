const jwt = require('jsonwebtoken');


const _jwtMiddleware = (req, res, next) => {

    const token = req.cookies.token;

    if (!token) {
        res.status(401).json({message: "Unauthorized"})
        return
    }

    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET)

    if (decoded) {
        req.userId = decoded.sub;
        next();
    } else {
        res.status(401).json({message: "Unauthorized"})
    }
}

module.exports = _jwtMiddleware;