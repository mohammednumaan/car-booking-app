// imports
const express = require("express");
const adminController = require("../controllers/adminController")

// initializing a router to handle similar routes
// in this case its for the '/booking' prefix route
const router = express.Router();

router.get("/bookings/ongoing", adminController.on_going_bookings_get)
router.get("/bookings/files/:filename", adminController.file_view_get);
router.post("/bookings/decision", adminController.confirm_booking_post)
module.exports = router;