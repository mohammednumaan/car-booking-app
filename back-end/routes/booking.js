const express = require('express');
const bookingController = require('../controllers/bookingController');
const router = express.Router();

router.post('/check', (req, res) => console.log('hi'))
router.post('/book', bookingController.book_post)


module.exports = router;
