const HttpError = require('./HttpError');

class InternalServerError extends HttpError {
  constructor(error) {
    super(500, `Internal server error : ${error}`);
  }
}

module.exports = InternalServerError;
