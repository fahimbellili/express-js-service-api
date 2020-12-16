const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const todoSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    todoListId: {
      type: String,
      default: 'NOT_AFFECTED',
      require: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    longDescription: {
      type: String,
      required: false,
    },
    completed: {
      type: Boolean,
      default: false,
      required: false,
    },
    deadline: {
      type: Date,
      require: false,
    },
  },
  { timestamps: true }
);

todoSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Todo', todoSchema);
