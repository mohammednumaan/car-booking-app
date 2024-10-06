const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Booking = require("../models/booking");
const multer = require('multer')
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/')
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({storage})

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
    // const errors = validationResult(req);
    const booking = new Booking({...req.body, img: "images/" + req.file.filename});
    await booking.save();
    
    res.json({booked: true, booking});
    
  }),
];
  
  