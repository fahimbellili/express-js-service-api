const TodoList = require('../models/TodoList');

const {
  objectCreationSuccess,
  objectUpdateSuccess,
  objectDeleteSuccess,
} = require('../wording/wording');

exports.createTodoList = async (req, res) => {
  try {
    // const todoObject = JSON.parse(req.body);
    const todoListObject = req.body;
    delete todoListObject.id;
    const todoList = new TodoList({ ...todoListObject });
    try {
      await todoList.save();
      res.status(201).json({ message: objectCreationSuccess });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  } catch (error) {
    res.status(422).json({ message: error });
  }
};

exports.updateTodoList = async (req, res) => {
  const todoListObject = req.body;
  try {
    await TodoList.updateOne(
      { _id: req.params.id },
      { ...todoListObject, _id: req.params.id }
    );
    return res.status(200).json({ message: objectUpdateSuccess });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

exports.deleteTodoList = async (req, res) => {
  try {
    await TodoList.findOne({ _id: req.params.id });
    try {
      await TodoList.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: objectDeleteSuccess });
    } catch (error) {
      res.status(400).json({ error });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.todoListGetOne = async (req, res) => {
  try {
    const todo = await TodoList.findOne({ _id: req.params.id });
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.todoListGetAll = async (req, res) => {
  const usrId = req.userId;
  try {
    const todoList = await TodoList.find({ userId: usrId });
    res.status(200).json(todoList);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
