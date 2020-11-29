const mongooseClient = require('mongoose');

const debug = require('debug')('express-todo-api:server');

const {
  dbConnectSuccessful,
  dbConnectNotSuccessful,
} = require('../lib/wording/wording');

const mongoClient = async () => {
  try {
    await mongooseClient.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    debug(dbConnectSuccessful);
  } catch (err) {
    debug(dbConnectNotSuccessful, '\n', err.stack);
  }
};

module.exports = mongoClient;
