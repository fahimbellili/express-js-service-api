const HttpError = require('./HttpError');

class PostNotFoundError extends HttpError {
  constructor(id) {
    super(404, `Post with id ${id} not found`);
  }
}

module.exports = PostNotFoundError;
