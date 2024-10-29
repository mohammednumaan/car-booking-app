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
    .custom(async (value, {req}) => {
      const username = await User.findOne({username: value});
      if (username) throw new Error("Username is Already Registered!");
      return true;
    })
    .escape(),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please Enter a Valid Email")
    .custom(async (value, {req}) => {

      const isPsgitechEmail = value.endsWith('@psgitech.ac.in');
      if (!isPsgitechEmail) throw new Error("Your Email Is Not Valid. Emails Should Be Connected To The PSGItech Instituition!")

      else{
        const email = await User.findOne({email: value});
        if (email) return false;
        return true;
      }
    })

    .escape(),
  body("staffID")
    .trim()
    .custom(async (value, {req}) => {
      const staffId = await User.findOne({staffID: value});
      if (staffId) throw new Error("The StaffID is Already Registered!");
      return true;
    })
    .escape(),

  body("phonenumber")
    .trim()
    .isLength(10)
    .withMessage("Phone Number Must Be 10 Digits!")
    .custom(async (value, {req}) => {
      const phone = await User.findOne({phone: value});
      if (phone) return false;
      return true;
    })
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
      phone : req.body.phonenumber,
      isAdmin: true
    });

    if (!errors.isEmpty()) {
      res.send({
        errors: errors.array(),
        registered : false
      });
    } 
    
    else {
      await user.save();
      res.json({registered: true});
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
  return res.json({user: req?.user, admin: req?.user?.isAdmin})
}

// a simple middleware functoin to handle a 'logout' POST request
module.exports.sign_out = (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.json({loggedOut: true});
  });
};



