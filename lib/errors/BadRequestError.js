const HttpError = require('./HttpError');

class BadRequestError extends HttpError {
  constructor() {
    super(400, 'Bad request');
  }
}

module.exports = BadRequestError;
