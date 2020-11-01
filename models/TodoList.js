const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const todoListSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    todoId: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

todoListSchema.plugin(uniqueValidator);

module.exports = mongoose.model('TodoList', todoListSchema);
