const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

async function register(req, res) {
    const { username, email, password, role } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, passwordHash, role });
    res.status(201).json(newUser);
}

async function login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user && bcrypt.compareSync(password, user.passwordHash)) {
        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET);
        res.json({ token });
    } else {
        res.status(401).send('Invalid credentials');
    }
}

module.exports = { register, login };
