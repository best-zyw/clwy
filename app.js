var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articlesRouter = require('./routes/admin/articles');
var article_categoriesRouter = require('./routes/admin/article_categories');
var coursesRouter = require('./routes/admin/courses');
var course_categoriesRouter = require('./routes/admin/course_categories');
var adminusersRouter = require('./routes/admin/users');
var chaptersRouter=require('./routes/admin/chapters');
var echartsRouter =require('./routes/admin/echarts');
var admin_login = require('./middlewares/admin_login');
var adminloginRouter = require('./routes/admin/login');
var homeRouter = require('./routes/home');
var categoriesRouter = require('./routes/categories');
var loginRouter = require('./routes/login');
var photosRouter = require('./routes/admin/photos');

var app = express();

app.use( cors( ) );

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin/articles',admin_login(), articlesRouter);
app.use('/admin/article_categories',admin_login(), article_categoriesRouter);
app.use('/admin/courses',admin_login(), coursesRouter);
app.use('/admin/course_categories',admin_login(), course_categoriesRouter);
app.use('/admin/users',admin_login(), adminusersRouter);
app.use('/admin/chapters',admin_login(),chaptersRouter);
app.use('/photos',admin_login(), photosRouter);
app.use('/admin/echarts',echartsRouter);
app.use('/login', adminloginRouter);
app.use('/api/home',homeRouter);
app.use('/api',categoriesRouter);
app.use('/api/login',loginRouter);

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
