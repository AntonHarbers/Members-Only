const asyncHandler = require('express-async-handler');
const Message = require('../models/message');

exports.index = [
  asyncHandler(async (req, res, next) => {
    // if the user is not signed in just retur the index
    if (!req.user) {
      res.render('index', {
        title: 'Members Only',
        user: null,
        messages: null,
      });
      return;
    }

    const messages = await Message.find({})
      .sort({ timestamp: 1 })
      .populate('author')
      .exec();

    res.render('index', {
      title: 'Members Only',
      user: req.user,
      messages: messages,
    });
  }),
];

exports.redirect_home = (req, res, next) => {
  res.redirect('/');
};
