// const express = require('express');

const UserService = require('../services/UserService');

const BadRequestError = require('../errors/BadRequestError');

// const { user_register_url, user_login_url } = require('../../conf/url.conf');

const userService = UserService;

class UserController {
  // constructor() {
  //   // this.router = express.Router();
  //   // this.service = UserService;
  //   // this.initializeRoutes();
  // }

  // initializeRoutes() {
  //   this.router.post(user_register_url, this.register);
  //   this.router.post(user_login_url, this.login);
  // }

  async register(req, res) {
    const usr = req.body;
    try {
      const { cookie, user } = await userService.registerService(usr);
      res.status(200).setHeader('Set-Cookie', [cookie]);
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
    }
  }

  get getRegister() {
    return this.register();
  }

  async login(req, res) {
    try {
      const usr = req.body;
      const { cookie, user } = await this.service.loginService(usr);
      res.status(200).setHeader('Set-Cookie', [cookie]);
      res.status(200).json(user);
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
