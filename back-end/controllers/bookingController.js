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
const upload = multer({storage, limits: {fileSize: 10 * 1024 * 1024}})

// configure and initialize nodemailer to send mails
const transporter = nodemailer.createTransport({
  service:"gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user:process.env.EMAIL_USER,
    pass:process.env.EMAIL_PASS
  }
})

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
    console.log(req.body)

    if (!errors.isEmpty()) {
      return res.send({
        errors: errors.array(),
        booked : false
      });
    }

    else{
      const booking = new Booking({...req.body, user: req.user._id, img: "files/" + req.file.filename, dualTrip: JSON.parse(req.body.dualTrip)});
      await booking.save();
      return res.json({booked: true, booking});
    }
    
  }),
];


// a simple controller function to handle 'booking history' GET request
module.exports.booking_history_get = asyncHandler(async (req, res, next) => {
  const bookingHistory = await Booking.find({user: req.user._id});
  res.json({history: bookingHistory});
})

// a simple controller function to handle 'on going bookings' GET request
module.exports.on_going_bookings_get = asyncHandler(async (req, res, next) => {
  const ongoingBookings = await Booking.find({isOnGoing: true});
  return res.json({bookings: ongoingBookings})
})

// a simple controller function to handle 'confirm booking' POST request
module.exports.confirm_booking_post = asyncHandler(async (req, res, next) => {
  const {objectId, status, driverAlloted, driverNumber} = req.body;
  console.log(status)
  const booking = await Booking.findById(objectId);

  if (!booking) return res.json({error: "Booking Does Not Exist!"});

  const newBooking = new Booking({
    ...booking,
    bookingStatus: status,
    isOnGoing: (status == "Accepted") ? true : false,
    driverAlloted,
    driverNumber,
    _id: booking._id
  })

  console.log(newBooking)
  await Booking.findByIdAndUpdate(objectId, newBooking);

  const emailOptions = {
    from: "", 
    to: "", 
    subject: `Booking Status`,
    text: `Booked!!!!`
  };

  transporter.sendMail(emailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  res.json({bookingStatus: newBooking.bookingStatus})
})
  
  