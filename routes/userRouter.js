const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/log-in', userController.log_in_post);

router.get('/auth/google/callback', userController.google_callback);

module.exports = router;