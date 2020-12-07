const HttpError = require('./HttpError');

class AuthenticationTokenMissingError extends HttpError {
  constructor() {
    super(401, 'Authentication token missing');
  }
}

module.exports = AuthenticationTokenMissingError;
