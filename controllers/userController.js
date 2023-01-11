const passport = require('passport');
const User = require('../models/user');

exports.index = (req, res, next) => {
    res.render('profile', {title: `Profile Info: ${req.user.name}`});
}

exports.log_in_post = passport.authenticate('google', {
    scope: ['email', 'profile']
});

exports.google_callback = passport.authenticate('google', {
    successRedirect: '/user',
    failureRedirect: '/log-in'
});

exports.display_name_edit_get = (req, res, next) => {
    res.render('display-name-edit', {title: "Edit Display Name"});
}

exports.display_name_edit_post = (req, res, next) => {
    User.findByIdAndUpdate(req.user.id, {display_name: req.body.display_name}, (err, result) => {
        if(err) return next(err);
    });

    res.redirect('/user');
}

exports.logout = (req, res, next) => {
    req.logout((err) => {
        if(err) return next(err);
        res.redirect('/');
    })
}