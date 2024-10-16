// imports
const asyncHandler = require("express-async-handler");
const Booking = require("../models/booking");
const User = require("../models/users");

const multer = require('multer')
const path = require("path");
const { body, validationResult } = require("express-validator");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/')
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({storage})

// a list of middlewares to handle a 'book' POST request
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
  
  upload.single("imageData"), 
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.send({
        errors: errors.array(),
        booked : false
      });
    }

    else{
      const booking = new Booking({...req.body, user: req.user._id, img: "images/" + req.file.filename});
      await booking.save();
      return res.json({booked: true, booking});
    }
    
  }),
];


// a simple controller function to handle 'booking history' GET request
module.exports.booking_history_get =  asyncHandler(async (req, res, next) => {
  const bookingHistory = await Booking.find({user: req.user._id, isOnGoing: true});
  if (!bookingHistory.length){
    res.json({history: []});
  } else{
    res.json({history: bookingHistory});
  }
})
  
  