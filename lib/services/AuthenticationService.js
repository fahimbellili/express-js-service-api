const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const randomBytes = require('bcrypt');

const User = require('../models/User');

const UserWithThatEmailAlreadyExistsError = require('../errors/UserWithThatEmailAlreadyExistsError');
const InternalServerError = require('../errors/InternalServerError');
const UserNotFoundError = require('../errors/UserNotFoundError');
const WrongCredentialsError = require('../errors/WrongCredentialsError');

class AuthenticationService {
  constructor() {
    this.model = User;
  }

  async register(userData) {
    const salt = randomBytes(32);
    if (await this.model.findOne({ email: userData.email })) {
      throw new UserWithThatEmailAlreadyExistsError(userData.email);
    }
    try {
      const hashedPassword = await argon2.hash(userData.password, { salt });
      const user = await this.model.save({
        ...userData,
        password: hashedPassword,
      });
      const tokenData = this.createToken(user);
      const cookie = this.createCookie(tokenData);
      return {
        cookie,
        user,
      };
    } catch (error) {
      throw new InternalServerError();
    }
  }

  async login(userData) {
    try {
      const usrData = await this.model.findOne({ email: userData.email });
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

  createCookie(tokenData) {
    return `Authorization=${tokenData.token}: HttpOnly; Max-Age=${tokenData.expireIn}`;
  }

  createToken(user) {
    const expireIn = 60 * 60; // one hour
    const secret = process.env.SECRET_TOKEN;
    const dataStoredInToken = {
      id: user.id,
    };
    return {
      expireIn,
      token: jwt.sign(dataStoredInToken, secret, { expireIn }),
    };
  }
}

module.exports = AuthenticationService;
