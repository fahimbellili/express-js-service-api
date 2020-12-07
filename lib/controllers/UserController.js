// const express = require('express');

const UserService = require('../services/UserService');

const BadRequestError = require('../errors/BadRequestError');

// const { user_register_url, user_login_url } = require('../../conf/url.conf');
const { userCreationSuccess } = require('../wording/wording');

const userService = new UserService();

class UserController {
  constructor() {
    // this.router = express.Router();
    this.service = userService;
    // this.initializeRoutes();
  }

  // initializeRoutes() {
  //   this.router.post(user_register_url, this.register);
  //   this.router.post(user_login_url, this.login);
  // }

  async register(req, res) {
    const user = req.body;
    try {
      await userService.registerService(user);
      res.status(200).json(userCreationSuccess).end();
    } catch (error) {
      console.log(error);
    }
  }

  async login(req, res) {
    try {
      const user = req.body;
      const cookie = await userService.loginService(user);
      res.status(200).setHeader('Set-Cookie', [cookie]);
      res.status(200).json(cookie);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async getCurrentUser(req, res) {
    try {
      const user = await this.service.getCurrentUser(req.params.id);
      return res.status(200).json(user);
    } catch (error) {
      throw new BadRequestError();
    }
  }
}

module.exports = new UserController();
