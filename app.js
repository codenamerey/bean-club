const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const path = require('path');
const dotenv = require('dotenv').config();

// Routes
const indexRouter = require('./routes/index');
const userRouter = require('./routes/userRouter');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static('public'));

passport.use(
    new GoogleStrategy({
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        done(null, profile);
    })
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.use(session({secret: 'secret', resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());



app.use('/', indexRouter);
app.use('/', userRouter);

app.listen(3000);