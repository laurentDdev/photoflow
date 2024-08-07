const _authService = require("../_services/_auth.service")

const _authController = {
    login: async (req, res) => {
        try {
            const {email, password} = req.body
            const user = await _authService.login(email, password);

            if (user) {
                res.cookie("token", user.token, {
                    maxAge: 60 * 60 * 1000,
                })
                res.status(200).json(user.user)
            }

        } catch (err) {
            res.status(500).json({error: err.message})
        }
    },
    register: async (req, res) => {
        try {
            const {username, email, password} = req.body;
            const newUser = await _authService.register(username, email, password);

            if (newUser) {
                res.status(201).json({message: "User created successfully"})
                return
            }

            res.status(400).json({message: "User not created"})

        } catch (err) {
            res.status(500).json({error: err.message})
        }
    },
    me: async (req, res) => {
        try {
            const {token} = req.cookies;

            if (!token) {
                res.json(null)
                return
            }

            const user = await _authService.me(token);
            if (user) {
                res.status(200).json(user)
            }

        } catch (err) {
            res.status(500).json({error: err.message})
        }
    },
    logout: async (req, res) => {
        res.clearCookie("token")
        res.end()
    }
}

module.exports = _authController;