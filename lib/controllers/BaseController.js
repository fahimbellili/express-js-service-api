const express = require('express');

const router = express.Router();

class BaseController {
  constructor() {
    this.router = router;
  }
}

module.exports = BaseController;
