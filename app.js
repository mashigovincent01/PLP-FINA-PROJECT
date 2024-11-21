const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passport = require('./config/passport');
const sequelize = require('./models/db');
const authRoutes = require('./routes/auth');

const app = express();

// Session configuration
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: new SequelizeStore({
            db: sequelize,
        }),
    })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
