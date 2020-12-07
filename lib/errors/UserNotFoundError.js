const HttpError = require('./HttpError');

class UserNotFoundError extends HttpError {
  constructor(id) {
    super(404, `User with id ${id} not found`);
  }
}

module.exports = UserNotFoundError;
