// Imports

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const helmet = require('helmet');
const compression = require('compression');
const mongoose = require('mongoose');
const User = require('./models/user');
var indexRouter = require('./routes/indexRoutes');
var messagesRouter = require('./routes/messagesRoutes');
require('dotenv').config();

// Create express app
var app = express();

// Set up rate limiter: maximum of twenty requests per minute
const RateLimit = require('express-rate-limit');
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 240,
});

// mongoose setup
mongoose.set('strictQuery', false);
const dev_db_url = process.env.MONGO_URL_DEV;
const prod_db_url = process.env.MONGO_URL_PROD;
const mongoDB = process.env.DEVMOVE == true ? dev_db_url : prod_db_url;

// mongoose connection with error handling
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// express session config
app.use(session({ secret: 'Mainly', resave: false, saveUninitialized: true }));

// Passport config
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) return done(null, false, { message: 'Username not found' });
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return done(null, false, { message: 'Incorrect Password' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Middleware Chain
app.set('trust proxy', 1);
app.use(limiter);
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
if (process.env.NODE_ENV !== 'production') {
  app.use(logger('dev'));
} else {
  // 'combined' is a good default for production
  app.use(logger('combined'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      'script-src': ["'self", 'code.jquery.com', 'cdn.jsdelivr.net'],
    },
  })
);
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));

// Router setup
app.use('/', indexRouter);
app.use('/messages', messagesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
