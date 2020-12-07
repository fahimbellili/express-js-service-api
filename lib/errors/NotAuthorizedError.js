const HttpError = require('./HttpError');

class NotAuthorizedError extends HttpError {
  constructor() {
    super(403, 'You are not authorized');
  }
}

module.exports = NotAuthorizedError;
