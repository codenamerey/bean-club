const express = require('express');
const router = express.Router();


const postController = require('../controllers/postController');

// Borrow logged_in function from userController.
const userController = require('../controllers/userController');

router.get('/create', userController.logged_in, postController.post_create_get);

router.post('/create', userController.logged_in, postController.post_create_post);

module.exports = router;