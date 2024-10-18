// imports
const express = require('express');
const userController = require('../controllers/userController');

// initializing a router object to handle similar routes
// (in this case, the user routes)
const router = express.Router();

// defining routes on the router object
router.get('/authenticated', userController.authenticate)
router.post('/register', userController.register_post)
router.post('/login', userController.login_post)

module.exports = router;
