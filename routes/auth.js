const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');
const UserRole = require('../models/UserRole');

const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
    const { email, password, role_name } = req.body;
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.status(400).json({ message: 'User already exists.' });

        // Get role ID
        const role = await UserRole.findOne({ where: { role_name } });
        if (!role) return res.status(400).json({ message: 'Invalid role.' });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await User.create({
            email,
            password: hashedPassword,
            role_id: role.role_id,
        });

        res.status(201).json({ message: 'User registered successfully.', user: newUser });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Login route
router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true,
}));

// Logout route
router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) return res.status(500).json({ message: 'Logout failed.' });
        res.redirect('/');
    });
});

module.exports = router;
