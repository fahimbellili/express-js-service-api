const express = require('express');
const config = require('config');

const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middlewares/auth');

const user_register_url = config.get('apiConf.user_register_url');
const user_login_url = config.get('apiConf.user_login_url');
const user_current_url = config.get('apiConf.user_current_url');

router.post(user_register_url, userCtrl.register);
router.post(user_login_url, userCtrl.login);
router.get(user_current_url, auth, userCtrl.getCurrentUser);

module.exports = router;
