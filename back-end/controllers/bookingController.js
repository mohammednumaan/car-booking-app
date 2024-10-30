// imports
const asyncHandler = require("express-async-handler");
const path = require("path");
const Booking = require("../models/booking");
const User = require("../models/users");
const { body, validationResult } = require("express-validator");
const nodemailer = require("nodemailer")

// configuring the dotenv package to populate the
// process node object to access env variables
require("dotenv").config({path: "../../.env"});

// configuring multer to handle multipart formdata (images)
// and upload those images to the /uploads folder in the root
const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'files/')
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// initialize the multer object with which we can successfully upload 
// images to our server
const upload = multer({storage, limits: {fileSize: 2 * 1024 * 1024}})

// a list of middlewares to handle a 'book' POST request
module.exports.book_post = [
   (req, res, next) => {
    upload.single("imageData")(req, res, (err) => {
      
      if (err instanceof multer.MulterError) {
        return res.json({ fileError: 'File too large. Max size is 10MB.' });
      } else if (err) {
        return res.json({ fileError: err.message });
      } else if (!req.file){
        return res.json({ fileError: 'Please Upload The Proof Of Reference.' });

      }
      next();
    });
  },
  
  body("fullname")
  .escape()
  .custom(async (value, {req}) => {
    const user = await User.findOne({username: value});
      if (user) return true;
      else throw new Error("Username Does Not Exist, Please Enter a Valid Username!");
  }),

  body("email")
    .escape()
    .isEmail()
    .withMessage("Please Enter a Valid Email")
    .custom(async (value) => {

      const isPsgitechEmail = value.endsWith('@psgitech.ac.in');
      if (!isPsgitechEmail) throw new Error("Your Email Is Not Valid. Emails Should Be Connected To The PSGItech Instituition!")
      else{
        const email = await User.findOne({email: value});
        if (email) return true;
        else throw new Error("Email Address Doesn't Exist. Please Enter a Valid Email Address!");
      }
  }),

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
  body("vehical")
  .trim()
  .escape(),
  
 
  asyncHandler(async (req, res, next) => {
    console.log("hello")
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
      return res.send({
        errors: errors.array(),
        booked : false
      });
    }
    else{
      const booking = new Booking({...req.body, user: req.user._id, img: req.file.filename});
      await booking.save();
      return res.json({booked: true, booking});
    }
    
  }),
];


// a simple controller function to handle 'booking history' GET request
module.exports.booking_history_get = asyncHandler(async (req, res, next) => {
  const bookingHistory = await Booking.find({user: req.user._id}).sort({arrival: -1})
  res.json({history: bookingHistory});
})

