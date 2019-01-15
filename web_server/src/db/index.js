const mongoose = require('mongoose');

const { DbUri } = require('../../config');

mongoose.connect(DbUri, {
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
