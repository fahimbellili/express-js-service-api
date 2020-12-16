const BaseController = require('./BaseController');
const todoService = require('../services/TodoService');
const authenticationMiddleware = require('../middlewares/authenticationMiddleware');

const {
  todo_post_url,
  todo_put_del_get_one_url,
  todo_get_all_url,
} = require('../../conf/url.conf');

const {
  objectCreationSuccess,
  objectUpdateSuccess,
  objectDeleteSuccess,
} = require('../wording/wording');

class TodoController extends BaseController {
  constructor() {
    super();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(todo_post_url, authenticationMiddleware, this.createTodo);
    this.router.put(
      todo_put_del_get_one_url,
      authenticationMiddleware,
      this.updateTodo
    );
    this.router.delete(
      todo_put_del_get_one_url,
      authenticationMiddleware,
      this.deleteTodo
    );
    this.router.get(
      todo_put_del_get_one_url,
      authenticationMiddleware,
      this.getOneTodo
    );
    this.router.get(
      todo_get_all_url,
      authenticationMiddleware,
      this.getAllTodos
    );
  }

  async createTodo(req, res) {
    const usrId = req.user;
    const todoObject = req.body;
    delete todoObject.id;
    todoObject.userId = usrId;
    try {
      await todoService.createService(todoObject);
      return res.status(201).json({ message: objectCreationSuccess });
    } catch (error) {
      return res.status(422).json({ message: error });
    }
  }

  async updateTodo(req, res) {
    const todoId = req.params.id;
    const todoObject = req.body;
    try {
      await todoService.updateService(todoObject, todoId);
      return res.status(200).json({ message: objectUpdateSuccess });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async deleteTodo(req, res) {
    const todoId = req.params.id;
    try {
      await todoService.deleteService(todoId);
      return res.status(200).json({ message: objectDeleteSuccess });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  async getOneTodo(req, res) {
    const todoId = req.params.id;
    try {
      const todo = await todoService.getOneService(todoId);
      return res.status(200).json(todo);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async getAllTodos(req, res) {
    const usrId = req.user;
    try {
      const todos = await todoService.getAllService(usrId);
      return res.status(200).json(todos);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}

module.exports = TodoController;
