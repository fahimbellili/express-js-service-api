require('dotenv').config();
const App = require('../lib/App');
const TodoController = require('../lib/controllers/TodoController');
const TodoListController = require('../lib/controllers/TodoListController');

const UserController = require('../lib/controllers/UserController');

const app = new App([
  new UserController(),
  new TodoController(),
  new TodoListController(),
]);

app.listen();
