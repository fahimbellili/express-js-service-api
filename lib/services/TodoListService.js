const TodoList = require('../models/TodoList');

const BadRequestError = require('../errors/BadRequestError');
const UserNotFoundError = require('../errors/UserNotFoundError');
const TodoNotFoundError = require('../errors/TodoNotFoundError');

class TodoListService {
  constructor() {
    this.Model = TodoList;
  }

  async createService(todoListData) {
    const todoList = new this.Model({ ...todoListData });
    try {
      await todoList.save();
    } catch (error) {
      throw new BadRequestError();
    }
  }

  async updateService(todoListData, todoListId) {
    try {
      await this.Model.updateOne(
        { _id: todoListId },
        { ...todoListData, _id: todoListId }
      );
    } catch (error) {
      throw new BadRequestError();
    }
  }

  async deleteService(todoListId) {
    try {
      const todoList = await this.Model.findOne({ _id: todoListId });
      if (!todoList) {
        throw new UserNotFoundError();
      }
      await this.Model.deleteOne({ _id: todoList.id });
    } catch (error) {
      throw new BadRequestError();
    }
  }

  async getOneService(todoListId) {
    try {
      const todoList = await this.Model.findOne({ _id: todoListId });
      return todoList;
    } catch (error) {
      return new TodoNotFoundError();
    }
  }

  async getAllService(usrId) {
    try {
      const todoLists = await this.Model.find({ userId: usrId });
      return todoLists;
    } catch (error) {
      return new BadRequestError();
    }
  }
}

module.exports = new TodoListService();
