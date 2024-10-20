// imports
const User = require("../models/users");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const { genPassword } = require("../passport/passportUtils");
const passport = require("passport");

// a list of middlewares to handle a 'register' POST request
module.exports.register_post = [
  body("username")
    .trim()
    .escape(),
  body("password")
    .trim()
    .isLength({min: 8})
    .withMessage("Password Must Have Atleast 8 Characters!")
    .escape(),


  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const saltHash = genPassword(req.body.password);
    const user = new User({
      username: req.body.username,
      salt: saltHash.salt,
      hash: saltHash.hash,
      email : req.body.email,
      staffID: req.body.staffID,
      phonenumber : req.body.phonenumber,
      isAdmin: true
    });

    if (!errors.isEmpty()) {
      res.send({
        username: user.username,
        password: req.body.password,
        errors: errors.array(),
        registered : false
      });
    } else {
      try {
        await user.save();
        res.json({registered: true});
      } catch (err) {
        return next(err);
      }
    }
  }),
];

// a list of middlewares to handle a 'login' POST request
module.exports.login_post = [
  body("username").trim().escape(),
  body("password").trim().escape(),

  (req, res, next) => {
    passport.authenticate("local", function (err, user, info) {
      if (err) return next(err);
      if (!user) res.send({ error: info.message });
      req.login(user, next);
    })(req, res, next);
  },
  (req, res, next) => {
    res.json({login: true, user:  req.user})
  },
];

// a simple middlewate function to handle an 'authenticate' POST request
module.exports.authenticate = (req, res, next) => {
  return res.json({user: req.user.username, admin: req.user.isAdmin})
}



