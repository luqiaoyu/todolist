const mongoose = require('mongoose');

const app = require('./src/app');
require('./src/db');

const PORT = process.env.PORT || 1337;
const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});


// server.close();
// mongoose.connection.close();
