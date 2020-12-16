const BaseController = require('./BaseController');
const todoListService = require('../services/TodoListService');
const authenticationMiddleware = require('../middlewares/authenticationMiddleware');

const {
  todoList_post_url,
  todoList_put_del_get_one_url,
  todoList_get_all_url,
} = require('../../conf/url.conf');

const {
  objectCreationSuccess,
  objectUpdateSuccess,
  objectDeleteSuccess,
} = require('../wording/wording');

class TodoListController extends BaseController {
  constructor() {
    super();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      todoList_post_url,
      authenticationMiddleware,
      this.createTodoList
    );
    this.router.put(
      todoList_put_del_get_one_url,
      authenticationMiddleware,
      this.updateTodoList
    );
    this.router.delete(
      todoList_put_del_get_one_url,
      authenticationMiddleware,
      this.deleteTodoList
    );
    this.router.get(
      todoList_put_del_get_one_url,
      authenticationMiddleware,
      this.getOneTodoList
    );
    this.router.get(
      todoList_get_all_url,
      authenticationMiddleware,
      this.getAllTodoLists
    );
  }

  async createTodoList(req, res) {
    const usrId = req.user;
    const todoListObject = req.body;
    delete todoListObject.id;
    todoListObject.userId = usrId;
    try {
      await todoListService.createService(todoListObject);
      return res.status(201).json({ message: objectCreationSuccess });
    } catch (error) {
      return res.status(422).json({ message: error });
    }
  }

  async updateTodoList(req, res) {
    const todoListId = req.params.id;
    const todoListObject = req.body;
    try {
      await todoListService.updateService(todoListObject, todoListId);
      return res.status(200).json({ message: objectUpdateSuccess });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async deleteTodoList(req, res) {
    const todoListId = req.params.id;
    try {
      await todoListService.deleteService(todoListId);
      return res.status(200).json({ message: objectDeleteSuccess });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  async getOneTodoList(req, res) {
    const todoListId = req.params.id;
    try {
      const todoList = await todoListService.getOneService(todoListId);
      return res.status(200).json(todoList);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async getAllTodoLists(req, res) {
    const usrId = req.user;
    try {
      const todoLists = await todoListService.getAllService(usrId);
      return res.status(200).json(todoLists);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}

module.exports = TodoListController;
