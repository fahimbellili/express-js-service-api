const jwt = require('jsonwebtoken');

const { userIdInvalid, requestInvalid } = require('../wording/wording');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const { userId } = decodedToken;
    if (req.body.userId && req.body.userId !== userId) {
      throw new Error(userIdInvalid);
    } else {
      req.userId = userId;
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error(requestInvalid),
    });
  }
};
