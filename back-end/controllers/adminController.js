// imports
const asyncHandler = require("express-async-handler");
const Booking = require("../models/booking");
const nodemailer = require("nodemailer")
const path = require("path");
const fs = require("fs");

// configuring the dotenv package to populate the
// process node object to access env variables
require("dotenv").config({path: "../../.env"});

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
    from: process.env.EMAIL_USER, 
    to: "voidofficial0191@gmail.com", 
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

// a simple controller function to handle a file view GET request

module.exports.file_view_get = (req, res, next) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "..", "files", filename);


  fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
          console.error(`File not found: ${filePath}`);
          return res.status(404).json({ error: "File not found" });
      }
      res.sendFile(filePath, (sendErr) => {
          if (sendErr) {
              console.error(`Error sending file: ${sendErr}`);
              return res.status(500).json({ error: "Error sending file" });
          }
      });
  });
}
  
  