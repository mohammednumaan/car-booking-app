const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Booking = require("../models/booking");


module.exports.book_post = [

    body("first")
      .trim()
      .escape(),
    body("last")
      .trim()
      .escape(),
      body("email")
      .trim()
      .escape(),
    body("pickLoc")
      .trim()
      .escape(),
      body("dropLoc")
      .trim()
      .escape(),
    body("reference")
      .trim()
      .escape(),
    body("no_of_ppl")
      .trim()
      .escape(),

    asyncHandler(async (req, res, next) => {
      const errors = validationResult(req);     
      const booking = new Booking({...req.body})

      if (!errors.isEmpty()) {
        res.send({
          ...req.body,
          errors: errors.array(),
          booked : false
        });
      } else{
        await booking.save()
        res.json({booked: true});
      }

    }),
  ];
  
  