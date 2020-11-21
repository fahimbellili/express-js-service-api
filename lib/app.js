const express = require('express');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const logger = require('morgan');

const mongoClient = require('../config/db');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const todoRouter = require('./routes/todo');
const todoListRouter = require('./routes/todoList');

mongoClient();
mongoose.set('useCreateIndex', true);

const app = express();

app.use(cors());
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/', userRouter);
app.use('/', todoRouter);
app.use('/', todoListRouter);

// catch 404 and forward to error handler
app.use(function notFoundHandler(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function errorHandler(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
