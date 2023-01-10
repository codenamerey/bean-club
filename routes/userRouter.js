const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/sign-up/dn', userController.sign_up_get);

router.get('/log-in', userController.log_in_post);

router.get('/auth/google/callback', userController.google_callback);

router.get('/user', userController.index);

module.exports = router;