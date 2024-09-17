require("dotenv").config({path: "../.env"});
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const bookingRouter = require('./routes/booking');


const cors = require("cors");
const app = express();

app.use(cors({
  origin : true,
  credentials: true,
}))

const mongoose = require('mongoose');
const passport = require("passport");
const session = require("express-session");
const MongoStore = require('connect-mongo');

mongoose.set('strictQuery', false);
const mongoDB = process.env.MONGO_URL;

main().catch((err) => console.log(err));
async function main(){
  await mongoose.connect(mongoDB);
}

app.set('view engine', 'jade');

const sessionStore = MongoStore.create({mongoUrl: process.env.MONGO_URL, collectionName: 'sessions'})
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true},
  
}))

app.use(passport.session());
require('./passport/passport');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/booking', bookingRouter);


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
  res.send(err)
});

module.exports = app;
