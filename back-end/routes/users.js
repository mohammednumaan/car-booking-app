var express = require('express');
const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');
var router = express.Router();

/* GET users listing. */
router.post('/register', userController.register_post)
router.post('/login', loginController.login_post)
router.get('/authenticated', (req, res, next) => {
  res.json({ user: req.user })
})

module.exports = router;
