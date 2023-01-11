const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/sign-up/dn', userController.log_in_post);

router.get('/log-in', userController.log_in_post);

router.get('/auth/google/callback', userController.google_callback);

router.get('/user', userController.index);

router.get('/user/dn/edit', userController.display_name_edit_get);

router.post('/user/dn/edit', userController.display_name_edit_post);

router.get('/logout', userController.logout);

module.exports = router;