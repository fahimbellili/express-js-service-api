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
    this.Model = User;
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
      const user = await userObject.save();
      const tokenData = this.createToken(user);
      const cookie = this.createCookie(tokenData);
      return {
        cookie,
        user,
      };
    } catch (error) {
      throw new InternalServerError(error);
    }
  }

  async loginService(userData) {
    const Model = this.model;
    try {
      const usrData = await Model.findOne({ email: userData.email });
      if (!usrData) {
        throw new UserNotFoundError(userData.id);
      }
      const isValid = await argon2.compare(userData.password, usrData);
      try {
        if (!isValid) {
          throw new WrongCredentialsError();
        }
        return this.createCookie(userData);
      } catch (error) {
        throw new InternalServerError();
      }
    } catch (error) {
      throw new InternalServerError();
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
    return `Authorization=${tokenData.token}: HttpOnly; Max-Age=${tokenData.expireIn}`;
  }

  createToken(user) {
    // const expireIn = 60 * 60; // one hour
    const secret = process.env.SECRET_TOKEN;
    const dataStoredInToken = {
      id: user.id,
    };
    return {
      // expireIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn: '24h' }),
    };
  }
}

module.exports = new UserService();
