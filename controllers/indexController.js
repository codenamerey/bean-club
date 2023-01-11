const User = require('../models/user');
const Post = require('../models/post');

const async = require('async');

exports.index = (req, res, next) => {

    async.parallel({
        users(callback) {
            User.find({}, (err, users) => {
                if(err) return callback(err, null);

                callback(null, users);
            })
        },

        posts(callback) {
            Post.find({})
                .sort({creation_date: -1}).
                exec((err, posts) => {
                    if(err) return callback(err, null);

                    callback(null, posts);
                })
        }
    }, (err, results) => {
        if(err) return next(err);

        res.render('index', { title: "The Bean Club", users: results.users, posts: results.posts });
    })
}