// imports
const express = require('express');
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// initializing a router object to handle similar routes
// (in this case its the index route)
const router = express.Router();

// defining routes on the router object

// defining an index route for the application
router.get('/', function(req, res, next) {
  res.send('hello');
});

// defining a contact route to allow users to
// contact the staff/admins
router.post('/contact', [
  body("name")
    .trim()
    .escape(),
  body("email")
    .trim()
    .escape(),

  body("message")
    .trim()
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.send({
        username: user.username,
        password: req.body.password,
        errors: errors.array(),
        registered : false
      });
    }
    else{

      // code
    }
  })
])

module.exports = router;
