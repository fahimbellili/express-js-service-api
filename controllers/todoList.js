const TodoList = require('../models/TodoList');

const {
  createElement,
  updateElement,
  deleteElement,
  getOneElement,
  getAllElements,
} = require('./baseController');

exports.createTodoList = (res, req) => {
  createElement(res, req, TodoList);
};

exports.updateTodoList = (req, res) => {
  updateElement(req, res, TodoList);
};

exports.deleteTodoList = (req, res) => {
  deleteElement(req, res, TodoList);
};

exports.todoListGetOne = (req, res) => {
  getOneElement(req, res, TodoList);
};

exports.todoListGetAll = (req, res) => {
  getAllElements(req, res, TodoList);
};
