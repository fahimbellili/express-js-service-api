const HttpError = require('./HttpError');

class UserWithThatEmailAlreadyExistsError extends HttpError {
  constructor(email) {
    super(400, `User with email ${email} alredy exists`);
  }
}

module.exports = UserWithThatEmailAlreadyExistsError;
