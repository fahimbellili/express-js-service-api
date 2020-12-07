const HttpError = require('./HttpError');

class WrongAuthenticationTokenError extends HttpError {
  constructor() {
    super(401, 'Wrong authentication token');
  }
}

module.exports = WrongAuthenticationTokenError;
