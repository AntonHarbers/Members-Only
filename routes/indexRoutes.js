const userController = require('../controllers/userController');
const indexController = require('../controllers/indexController');
var express = require('express');
var router = express.Router();

// Home Page with login for and messages if signed in
router.get('/', indexController.index);

// Sign up handling
router.get('/sign-up', userController.get_sign_up);
router.post('/sign-up', userController.post_sign_up);

// Handle Log in functionality
router.get('/log-in', indexController.redirect_home);
router.post('/log-in', userController.post_log_in);

// Handle Log out funtionality
router.get('/log-out', userController.get_log_out);

// Become member routes
router.get('/membership', userController.get_membership);
router.post('/membership', userController.post_membership);

// Become admin routes
router.get('/admin', indexController.redirect_home);
router.post('/admin', userController.post_admin);

module.exports = router;
