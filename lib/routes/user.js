const express = require('express');

const router = express.Router();

const userCtrl = require('../controllers/userController');
const auth = require('../middlewares/auth');
const {
  user_register_url,
  user_login_url,
  user_current_url,
} = require('../../conf/url.conf');

router.post(user_register_url, userCtrl.register);
router.post(user_login_url, userCtrl.login);
router.get(user_current_url, auth, userCtrl.getCurrentUser);

module.exports = router;
