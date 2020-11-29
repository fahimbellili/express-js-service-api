const Todo = require('../models/Todo');

const {
  createElement,
  updateElement,
  deleteElement,
  getOneElement,
  getAllElements,
} = require('./baseController');

exports.createTodo = (res, req) => {
  createElement(res, req, Todo);
};

exports.updateTodo = (req, res) => {
  updateElement(req, res, Todo);
};

exports.deleteTodo = (req, res) => {
  deleteElement(req, res, Todo);
};

exports.getOneTodo = (req, res) => {
  getOneElement(req, res, Todo);
};

exports.getAllTodo = (req, res) => {
  getAllElements(req, res, Todo);
};
