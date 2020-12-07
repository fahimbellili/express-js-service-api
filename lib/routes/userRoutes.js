const express = require('express');

const router = express.Router();

const UserController = require('../controllers/UserController');
const {
  user_register_url,
  user_login_url,
  user_current_url,
} = require('../../conf/url.conf');

router.post(user_register_url, UserController.register);
router.post(user_login_url, UserController.login);
router.get(user_current_url, UserController.getCurrentUser);

module.exports = router;
