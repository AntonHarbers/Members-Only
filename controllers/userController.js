const User = require('../models/user');
const Message = require('../models/message');
const bcrypt = require('bcryptjs');

const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const passport = require('passport');

require('dotenv').config();

exports.get_sign_up = [
  asyncHandler(async (req, res, next) => {
    res.render('sign_up_form', { title: 'Sign Up' });
  }),
];

exports.post_sign_up = [
  body('username', 'username must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('username').custom(async (value) => {
    const user = await User.find({ username: value }).exec();
    if (user.length != 0) throw new Error('username already exists');
  }),
  body('password', 'password must be at least 8 characters long')
    .trim()
    .isLength({ min: 8 })
    .escape(),
  body('confirmPassword', 'Passwords do not match').custom((value, { req }) => {
    return value === req.body.password;
  }),
  body('firstName', 'first name must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('lastName', 'last name must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    // check for validation errors and return the sign up form if they exists
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('sign_up_form', { title: 'Sign up', errors: errors.array() });
    } else {
      // if there is no existing user then encrypt password and save this user to db
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) {
          return next(err);
        } else {
          const user = new User({
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            username: req.body.username,
            password: hashedPassword,
          });
          const result = await user.save();
          res.redirect('/');
        }
      });
    }
  }),
];

exports.post_log_in = [
  body('username', 'Username must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('password', 'Password must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('index', {
        title: 'Members Only',
        user: req.user,
        errors: errors.array(),
      });
      return;
    } else {
      next();
    }
  }),
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
  }),
];

exports.get_log_out = [
  (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  },
];

exports.get_membership = [
  (req, res, next) => {
    res.render('membership', { title: 'Membership', user: req.user });
  },
];

exports.post_membership = [
  body('code', 'Wrong Code').equals(process.env.MEMBERSHIP_CODE),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('membership', {
        title: 'Membership',
        errors: errors.array(),
        user: req.user,
      });
      return;
    } else {
      const user = await User.findById(req.user.id).exec();

      if (user === null) {
        const err = new Error('User not found');
        err.status = 404;
        return next(err);
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { membership_status: 'member' },
        {}
      );

      res.redirect('/');
    }
  }),
];

exports.post_admin = [
  body('code', 'Wrong Code').equals(process.env.ADMIN_CODE),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('membership', {
        title: 'Membership',
        errors: errors.array(),
        user: req.user,
      });
    } else {
      const user = await User.findById(req.user.id).exec();

      if (user === null) {
        const err = new Error('User not found');
        err.status = 404;
        return next(err);
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { membership_status: 'admin' },
        {}
      );
      res.redirect('/');
    }
  }),
];
