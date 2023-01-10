const passport = require('passport');

exports.sign_up_get = (req, res, next) => {
    res.render('sign-up-form', {title: "Sign Up Form"});
}

exports.log_in_get = (req, res, next) => {
    res.render('log-in');
}

exports.log_in_post = passport.authenticate('google', {
    scope: ['email', 'profile']
});

exports.google_callback = passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/log-in'
});