const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Booking = require("../models/booking");
const fs = require("fs");
const multer = require('multer')
const upload = multer({ dest: 'images/' })


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
      const booking = new Booking({...req.body, img: fs.readFileSync("uploads/" + req.file.filename)});

      if (!errors.isEmpty()) {
        res.send({
          ...req.body,
          errors: errors.array(),
          booked : false
        });
      } else{
        await booking.save()
        res.json({booked: true, booking});
      }

    }),
  ];
  
  