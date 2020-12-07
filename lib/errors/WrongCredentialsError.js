const HttpError = require('./HttpError');

class WrongCredentialsError extends HttpError {
  constructor() {
    super(401, 'Wrong credentials provided');
  }
}

module.exports = WrongCredentialsError;
