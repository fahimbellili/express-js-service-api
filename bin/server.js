require('dotenv').config();
const App = require('../lib/App');

const UserController = require('../lib/controllers/UserController');

const app = new App([new UserController()]);

app.listen();
