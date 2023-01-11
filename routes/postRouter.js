const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

router.get('/create', postController.post_create_get);

router.post('/create', postController.post_create_post);

module.exports = router;