const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const session = require('koa-session');

const passport = require('koa-passport');

const routers = require('./routers');



const app = new Koa();

const PORT = process.env.PORT || 1337;

app.use(bodyParser());
// app.use(cors());

// // authentication
// require('./auth-passport');
// app.use(passport.initialize());
// app.use(passport.session());


// routes
app.use(routers.routes());
app.use(routers.allowedMethods());



const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;