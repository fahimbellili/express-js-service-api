const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const todoSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
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
      require: true,
    },
  },
  { timestamps: true }
);

todoSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Todo', todoSchema);
