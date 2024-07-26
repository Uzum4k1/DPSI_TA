const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');

exports.register = async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    User.findByEmail(email, async (err, user) => {
        if (user) return res.status(400).send('User already exists');

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save the user
        const newUser = { email, password: hashedPassword };
        User.create(newUser, (err, user) => {
            if (err) return res.status(500).send('Error creating user');
            res.status(201).send(user);
        });
    });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    User.findByEmail(email, async (err, user) => {
        if (err) return res.status(500).send('Error finding user');
        if (!user) return res.status(400).send('Email or password is wrong');

        // Validate password
        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) return res.status(400).send('Invalid password');

        // Create and assign a token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        res.header('Authorization', token).send({ token });
    });
};
