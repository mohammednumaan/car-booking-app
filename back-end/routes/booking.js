const express = require('express');
const bookingController = require('../controllers/bookingController');
const router = express.Router();

const multer = require('multer')
const upload = multer({ dest: 'images/' })

router.post('/book', upload.single("image"), bookingController.book_post)
router.get('/hi', (req, res) => console.log('hiiiii'))


module.exports = router;
