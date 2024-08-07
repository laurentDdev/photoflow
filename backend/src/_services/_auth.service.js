const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _user = require('../_models/_user.model');
const _userDto = require('../_dto/_user.dto');

const _authService = {
    login: async (email, password) => {
        const user = await _user.findOne({email: email}).exec()
        if (!user) {
            throw new Error("Email or password is incorrect");
        }

        if (bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({}, process.env.JWT_SECRET, {expiresIn: '1h', subject: user._id.toString()});
            return {
                token,
                user: new _userDto(user)
            }

        } else {
            throw new Error("Email or password is incorrect");
        }
    },

    register: async (username, email, password) => {
        const user = await _user.findOne({email}).exec()
        if (user) {
            throw new Error("User already exists");
        }

        const newUser = new _user({
            username,
            email,
            password: bcrypt.hashSync(password, 10)
        })

        await newUser.save();

        return newUser;
    },
    me: async (token) => {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await _user.findById(decoded.sub).exec();
        if (user) {
            return new _userDto(user);
        }
    }
}


module.exports = _authService;