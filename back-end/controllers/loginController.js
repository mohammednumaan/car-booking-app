const passport = require("passport");
const { body } = require("express-validator");

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
  (req, res, next) => res.send({login: true, user:  req.user}),
];