const Todo = require('../models/Todo');

const BadRequestError = require('../errors/BadRequestError');
const UserNotFoundError = require('../errors/UserNotFoundError');
const TodoNotFoundError = require('../errors/TodoNotFoundError');

class TodoService {
  constructor() {
    this.Model = Todo;
  }

  async createService(todoData) {
    const todo = new this.Model({ ...todoData });
    try {
      await todo.save();
    } catch (error) {
      throw new BadRequestError();
    }
  }

  async updateService(todoData, todoId) {
    try {
      await this.Model.updateOne({ _id: todoId }, { ...todoData, _id: todoId });
    } catch (error) {
      throw new BadRequestError();
    }
  }

  async deleteService(todoId) {
    try {
      const todo = await this.Model.findOne({ _id: todoId });
      if (!todo) {
        throw new UserNotFoundError();
      }
      await this.Model.deleteOne({ _id: todo.id });
    } catch (error) {
      throw new BadRequestError();
    }
  }

  async getOneService(todoId) {
    try {
      const todo = await this.Model.findOne({ _id: todoId });
      return todo;
    } catch (error) {
      return new TodoNotFoundError();
    }
  }

  async getAllService(usrId) {
    try {
      const todos = await this.Model.find({ userId: usrId });
      return todos;
    } catch (error) {
      return new BadRequestError();
    }
  }
}

module.exports = new TodoService();
