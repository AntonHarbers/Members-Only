var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(req.user);
  res.render('index', { title: 'Members Only', user: req.user });
});

router.get('/sign-up', userController.get_sign_up);

router.post('/sign-up', userController.post_sign_up);

router.get('/membership', userController.get_membership);

router.post('/membership', userController.post_membership);

router.get('/log-in', userController.get_log_in);

router.post('/log-in', userController.post_log_in);

router.get('/log-out', userController.get_log_out);

module.exports = router;
