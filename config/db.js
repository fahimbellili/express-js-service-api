const mongooseClient = require('mongoose');

const {
  dbConnectSuccessful,
  dbConnectNotSuccessful,
} = require('../wording/wording');

const mongoClient = async () => {
  try {
    await mongooseClient.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(dbConnectSuccessful);
  } catch (err) {
    console.log(dbConnectNotSuccessful, '\n', err.stack);
  }
};

module.exports = mongoClient;
