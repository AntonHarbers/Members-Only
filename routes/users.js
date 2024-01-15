var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');

// GET Sign up Form
router.get('/', userController.get_sign_up);

module.exports = router;
