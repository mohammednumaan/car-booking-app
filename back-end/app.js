// configuring dotenv to populate the 'process' object to have
// access to environment variables 
require("dotenv").config({path: "../.env"});

// imports
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// router object imports
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const bookingRouter = require('./routes/booking');
const adminRouter = require('./routes/admin');

// configuring cors to allow cross-origin requests
const cors = require("cors");
const app = express();

app.use(cors({
  origin : true,
  credentials: true,
}))

// configuring the mongodb connection via mongoose
// and the session store via connect-mongo
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

const sessionStore = MongoStore.create({mongoUrl: process.env.MONGO_URL, collectionName: 'sessions'})
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true},
  
}))

// initializing the passport middleware
app.use(passport.session());
require('./passport/passport');

app.set('view engine', 'jade');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// adding index, booking and users routes to the middleware chain
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/booking', bookingRouter);
app.use('/admin', adminRouter);



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
