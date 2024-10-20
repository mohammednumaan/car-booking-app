// imports
const express = require('express');
const bookingController = require('../controllers/bookingController');

// initializing a router to handle similar routes
// in this case its for the '/booking' prefix route
const router = express.Router();

// defining routes for the '/book' prefix route

// defines a '/book' route to process the form
// and initiate a booking via a POST request from the client
router.post('/book', bookingController.book_post)
router.post('/confirm-booking', bookingController.confirm_booking_post)
router.get('/history', bookingController.booking_history_get)
router.get('/admin/on-going', bookingController.on_going_bookings_get)
router.put('/admin/confirm-reject', bookingController.confirm_booking_post)




module.exports = router;