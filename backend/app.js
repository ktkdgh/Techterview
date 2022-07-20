var createError = require('http-errors');
var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var dotenv = require('dotenv');
var cors = require('cors');
dotenv.config();

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var feedbackRouter = require('./routes/feedback');
var questionListRouter = require('./routes/questionList');
var aloneRouter = require('./routes/training/alone');
var othersRouter = require('./routes/training/others');

var app = express();

app.use(cors());

const { sequelize } = require('./models/index');
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database connected OK!');
  })
  .catch((err) => {
    console.error(err);
  });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(cors());

app.use(session({ secret: 'MySecret', resave: false, saveUninitialized: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/feedback', feedbackRouter);
app.use('/questionList', questionListRouter);
app.use('/training/alone', aloneRouter);
app.use('/training/others', othersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
