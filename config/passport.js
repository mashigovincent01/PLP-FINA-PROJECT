const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const UserRole = require('../models/UserRole');

// Local strategy for login
passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
            const user = await User.findOne({ where: { email } });
            if (!user) return done(null, false, { message: 'Incorrect email or password.' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return done(null, false, { message: 'Incorrect email or password.' });

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);

// Serialize user
passport.serializeUser((user, done) => {
    done(null, user.user_id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id, { include: UserRole });
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;
