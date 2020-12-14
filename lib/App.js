const express = require('express');
const httpCors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const debug = require('debug')('express-todo-api:server');

const mongoClient = require('../conf/db.conf');
// const indexRouter = require('./controllers/index');
// const userRouter = require('./routes/userRoutes');

class App {
  constructor(controllers) {
    this.app = express();
    this.mongoClient = mongoClient;
    // this.getControllers = getControllers();
    // this.indexController = IndexController;

    this.connectToDatabase();
    this.setMiddlewares();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    // this.initializeErrorHandling();
  }

  listen() {
    this.app.listen(process.env.API_PORT, () => {
      debug(`App listening on the port ${process.env.API_PORT}`);
    });
  }

  getServer() {
    return this.app;
  }

  connectToDatabase() {
    this.mongoClient();
  }

  setMiddlewares() {
    this.app.set('views', path.join(__dirname, '../public/views'));
    this.app.set('view engine', 'ejs');
  }

  initializeMiddlewares() {
    this.app.use(httpCors());
    this.app.use(bodyParser.json());
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(express.static(path.join(__dirname, '../public')));
  }

  initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }
}

module.exports = App;

// mongoClient();

// const app = express();

// app.use(cors());
// app.use(bodyParser.json());

// // view engine setup
// app.set('views', path.join(__dirname, '../public/views'));
// app.set('view engine', 'ejs');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, '../public')));

// // Routes
// app.use('/', indexRouter);
// app.use('/', userRouter);

// // catch 404 and forward to error handler
// // app.use(function notFoundHandler(req, res, next) {
// //   next(createError(404));
// // });

// // error handler
// app.use(function errorHandler(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
