const Todo = require('../models/Todo');

const {
  objectCreationSuccess,
  objectUpdateSuccess,
  objectDeleteSuccess,
} = require('../wording/wording');

exports.createTodo = async (req, res) => {
  try {
    // const todoObject = JSON.parse(req.body);
    const todoObject = req.body;
    delete todoObject.id;
    const todo = new Todo({ ...todoObject });
    try {
      await todo.save();
      res.status(201).json({ message: objectCreationSuccess });
    } catch (error) {
      res.status(400).json({ error });
    }
  } catch (error) {
    res.status(422).json({ error });
  }
};

exports.updateTodo = async (req, res) => {
  const todoObject = req.body;
  try {
    await Todo.updateOne(
      { _id: req.params.id },
      { ...todoObject, _id: req.params.id }
    );
    return res.status(200).json({ message: objectUpdateSuccess });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    await Todo.findOne({ _id: req.params.id });
    try {
      await Todo.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: objectDeleteSuccess });
    } catch (error) {
      res.status(400).json({ error });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.todoGetOne = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id });
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.todoGetAll = async (req, res) => {
  const usrId = req.userId;
  try {
    const todos = await Todo.find({ userId: usrId });
    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
