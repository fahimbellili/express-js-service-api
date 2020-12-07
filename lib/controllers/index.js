const express = require('express');

const router = express.Router();

const { base_url } = require('../../conf/url.conf');

/* GET home page. */
router.get(base_url, function indexPage(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
