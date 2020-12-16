const HttpError = require('./HttpError');

class TodoNotFoundError extends HttpError {
  constructor(id) {
    super(404, `Todo with id ${id} not found`);
  }
}

module.exports = TodoNotFoundError;
