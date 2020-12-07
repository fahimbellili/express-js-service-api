const express = require('express');

class BaseController {
  constructor() {
    this.router = express.Router();
  }
}

module.exports = BaseController;
