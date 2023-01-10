const passport = require('passport');

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