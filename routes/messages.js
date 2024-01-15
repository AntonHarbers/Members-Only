var express = require('express');
var router = express.Router();

const messageController = require('../controllers/messageController');

/* GET new message form. */
router.get('/new', messageController.get_new_message);

router.post('/new', messageController.post_new_message);

router.post('/delete', messageController.post_delete_message);

module.exports = router;
