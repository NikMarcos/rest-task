const createError = require('http-errors');
const express = require('express');
const path = require('path');
const sassMiddleware = require('node-sass-middleware');
var postcssMiddleware = require('postcss-middleware');
var autoprefixer = require('autoprefixer');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
let destPath = __dirname + '/public/stylesheetsss';
app.use(sassMiddleware({
    src: './src/stylesheets',
    dest: destPath,
    debug: true,
    prefix: '/stylesheets',
    // outputStyle: 'compressed',
}));

app.use(
  '/stylesheets', postcssMiddleware({
    src: function(req) {
      return path.join(__dirname, 'public', 'stylesheets', req.path);
    },
    plugins: [
      autoprefixer()
    ],
    options: {
      map: {
        inline: false
      }
    }
  }
));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
