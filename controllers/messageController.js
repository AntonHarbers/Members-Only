const Message = require('../models/message');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

exports.get_new_message = [
  (req, res, next) => {
    res.render('message_form', { title: 'New Message', user: req.user });
  },
];

exports.post_new_message = [
  body('title', 'Title must not be empty').trim().isLength({ min: 1 }).escape(),
  body('content', 'Content must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('author').escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('message_form', {
        title: 'New Message',
        user: req.user,
        errors: errors.array(),
      });
      return;
    } else {
      const message = new Message({
        title: req.body.title,
        content: req.body.content,
        author: req.user.id,
      });

      const newMessage = await message.save();
      res.redirect('/');
    }
  }),
];

exports.post_delete_message = [
  body('messageId').custom(async (value) => {
    const message = await Message.findById(value).exec();

    if (!message) throw new Error('Message not found');
  }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty() && req.user.membership_status == 'admin') {
      const result = await Message.findByIdAndDelete(req.body.messageId);
    }

    res.redirect('/');
  }),
];
