const Post = require('../models/post');
const { body, validationResult } = require('express-validator');


exports.post_create_get = (req, res, next) => {
    res.render('post-create-form', {title: 'Create Post'});
}

exports.post_create_post = [
    body('title', 'Title is required.').trim()
                 .isLength({min: 1})
                 .escape(),
    body('content', 'Post content is required.').trim()
                                                .isLength({min: 1})
                                                .escape(),
    (req, res, next) => {
        const errors = validationResult(req);

        const post = new Post({
            title: req.body.title,
            content: req.body.content,
            author: req.user,
            creation_date: new Date()
        });

        if(!errors.isEmpty()) {
            // There are errors, re-render post page.
            res.render('post-create-form', { title: 'Create Post', post, errors: errors.array() });
        } else {
            post.save((err) => {
                if(err) return next(err);

                res.redirect('/');
            })
        }
    }

];