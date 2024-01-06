const User = require('./user_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function register(req, res) {
    try {
        const { first_name, last_name, username, password } = req.body;

        const user = await User.findOne({ username });
        if (user) {
            return res.status(409).json({ message: "Username already taken please enter another" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            first_name,
            last_name,
            username,
            password: hashedPassword
        });

        await newUser.save();
        return res.status(201).json({ message: "New User created" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" })
    }
}

async function login(req, res) {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "No user found" });
        }

        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return res.status(401).json({ message: "Incorrect Password" });
        }

        const Token = await jwt.sign({ userID: user._id }, process.env.SECRETE_KEY);

        return res.status(200).json({ message: "Authorised", token: Token });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { register, login }