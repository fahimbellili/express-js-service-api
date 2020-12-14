const jwt = require('jsonwebtoken');

const User = require('../models/User');
const AuthenticationTokenMissingException = require('../errors/AuthenticationTokenMissingError');
const WrongAuthenticationTokenException = require('../errors/WrongAuthenticationTokenError');

async function authenticationMiddleware(req, res, next) {
  const { cookies } = req;
  if (cookies && cookies.Authorization) {
    const secretToken = process.env.SECRET_TOKEN;
    try {
      const verificationResponse = jwt.verify(
        cookies.Authorization,
        secretToken
      );
      const userId = verificationResponse.id;
      const user = await User.findById(userId);
      if (user) {
        req.user = user.id;
        next();
      } else {
        next(new WrongAuthenticationTokenException());
      }
    } catch (error) {
      next(new WrongAuthenticationTokenException());
    }
  } else {
    next(new AuthenticationTokenMissingException());
  }
}

module.exports = authenticationMiddleware;
