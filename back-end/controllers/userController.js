const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const User = require("../models/users");
const { genPassword } = require("../passport/passportUtils");

module.exports.register_post = [

  body("username")
    .trim()
    .escape(),
  body("password")
    .trim()
    .escape(),


  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const saltHash = genPassword(req.body.password);
    const user = new User({
      username: req.body.username,
      salt: saltHash.salt,
      hash: saltHash.hash,
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

