const Mongoose = require('mongoose');

const { DbUri } = require('../config');

Mongoose.connect(DbUri, {
  useNewUrlParser: true,
  connectTimeoutMS: 10000,
  keepAlive: true,
  reconnectTries: 30,
})
  .then(() => {
    console.warn('db connect success:', DbUri);
  }, (err) => {
    console.warn('db connect failed', err);
  });
