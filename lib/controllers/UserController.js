const BaseController = require('./BaseController');
const userService = require('../services/UserService');
const authenticationMiddleware = require('../middlewares/authenticationMiddleware');
const BadRequestError = require('../errors/BadRequestError');

const {
  user_register_url,
  user_login_url,
  user_current_url,
} = require('../../conf/url.conf');
const { userCreationSuccess } = require('../wording/wording');

class UserController extends BaseController {
  constructor() {
    super();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(user_register_url, this.register);
    this.router.post(user_login_url, this.login);
    this.router.get(
      user_current_url,
      authenticationMiddleware,
      this.getCurrentUser
    );
  }

  async register(req, res) {
    const user = req.body;
    try {
      const cookie = await userService.registerService(user);
      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json(userCreationSuccess).end();
    } catch (error) {
      // console.log(error);
      res.status(500).json({ message: error });
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

  logout(req, res) {
    res.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
    res.status(200).json('Logget Out').end();
  }

  async getCurrentUser(req, res) {
    const userId = req.user;
    try {
      const user = await userService.getCurrentUserService(userId);
      return res.status(200).json(user);
    } catch (error) {
      throw new BadRequestError();
    }
  }
}

module.exports = UserController;
