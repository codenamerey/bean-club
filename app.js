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

// Models
const User = require('./models/user');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static('public'));

const mongoose = require('mongoose');
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(process.env.mongoDB, dbOptions);
const db = mongoose.connection;

db.on('error', console.error.bind(console, "MongoDB Connection Error: "));


passport.use(
    new GoogleStrategy({
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({email_address: profile.email}, (err, user) => {
            if(err) return done(err);
            if(user) return done(null, user);
            // If there is no user with that email_address, create one
            const new_user = new User({
                first_name: profile.given_name,
                last_name: profile.family_name,
                joined_date: new Date(),
                display_picture: profile.picture,
                email_address: profile.email
            })

            new_user.save((err) => {
                if(err) return done(err);

                return done(null, new_user);
            });
        });
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(null, user);
    })
});



app.use(session({secret: 'secret', resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({extended: true}));

// Use user for every view
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.use('/', userRouter);
app.use('/', indexRouter);

app.listen(3000);