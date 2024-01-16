var express = require('express');
var router = express.Router();

const messageController = require('../controllers/messageController');
const indexController = require('../controllers/indexController');

// List of messages is shown in homepage so on "/messages" route redirect to home
router.get('/', indexController.redirect_home);

// Routes for creating new messsage
router.get('/new', messageController.get_new_message);
router.post('/new', messageController.post_new_message);

// Routes for deleting message
router.get('/delete', indexController.redirect_home);
router.post('/delete', messageController.post_delete_message);

module.exports = router;
