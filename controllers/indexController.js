const User = require('../models/user');

exports.index = (req, res, next) => {
    User.find({}, (err, users) => {
        if(err) next(err);

        res.render('index', {title: "The Bean Club", users});
    });
}