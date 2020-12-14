const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');

const User = require('../models/User');

const UserWithThatEmailAlreadyExistsError = require('../errors/UserWithThatEmailAlreadyExistsError');
const InternalServerError = require('../errors/InternalServerError');
const UserNotFoundError = require('../errors/UserNotFoundError');
const WrongCredentialsError = require('../errors/WrongCredentialsError');

class UserService {
  constructor() {
    this.model = User;
  }

  async registerService(userData) {
    const Model = this.model;
    const salt = randomBytes(32);
    if (await Model.findOne({ email: userData.email })) {
      throw new UserWithThatEmailAlreadyExistsError(userData.email);
    }
    try {
      const hashedPassword = await argon2.hash(userData.password, { salt });
      const userObject = new Model({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: hashedPassword,
        salt: salt.toString('hex'),
      });
      await userObject.save();
    } catch (error) {
      throw new InternalServerError(error);
    }
  }

  async loginService(userData) {
    const Model = this.model;
    try {
      const userDB = await Model.findOne({ email: userData.email });
      if (!userDB) {
        throw new UserNotFoundError(userData.id);
      }
      const isValid = await argon2.verify(userDB.password, userData.password);
      try {
        if (!isValid) {
          throw new WrongCredentialsError();
        }
        const tokenData = this.createToken(userDB);
        const cookie = this.createCookie(tokenData);
        return cookie;
      } catch (error) {
        throw new InternalServerError();
      }
    } catch (error) {
      throw new InternalServerError(error);
    }
  }

  async getCurrentUserService(userId) {
    const Model = this.model;
    try {
      const user = await Model.findOne({ _id: userId });
      return user;
    } catch (error) {
      throw new UserNotFoundError(userId);
    }
  }

  createCookie(tokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expireIn}`;
  }

  createToken(user) {
    const expireIn = 60 * 60; // one hour
    const secret = process.env.SECRET_TOKEN;
    const dataStoredInToken = {
      id: user.id,
    };
    return {
      expireIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn: expireIn }),
    };
  }
}

module.exports = new UserService();
