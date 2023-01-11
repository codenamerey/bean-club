const passport = require('passport');
const User = require('../models/user');
const { body, validationResult } = require('express-validator');

exports.logged_in = (req, res, next) => {
    if(req.user) {
        next();
    } else {
        res.redirect('/');
    }
}

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

exports.display_name_edit_post = [ 

    body('display_name', 'Display name is required').trim()
                        .isAlphanumeric()
                        .withMessage('Display name has to be alphanumeric')
                        .isLength({min: 1})
                        .escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            // There are errors, re-render page again.
            res.render('display-name-edit', {title: "Edit Display Name", errors: errors.array()});
        } else {
            User.findByIdAndUpdate(req.user.id, {display_name: req.body.display_name}, (err, result) => {
                if(err) return next(err);
            });

            res.redirect('/user');
        }
}];

exports.logout = (req, res, next) => {
    req.logout((err) => {
        if(err) return next(err);
        res.redirect('/');
    })
}