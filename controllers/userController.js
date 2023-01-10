const passport = require('passport');

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