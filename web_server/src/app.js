const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');

// const session = require('koa-session');
// const mongoose = require('mongoose');
// const passport = require('koa-passport');

const routers = require('./routers');
const config = require('../config');
const {tokenToUserLoggedIn, addStateInContext} = require('./middlewares');

// require('./db');

const app = new Koa();


app.use(bodyParser());
app.use(cors());

app.use(addStateInContext);
app.use(tokenToUserLoggedIn);


// // authentication
// require('./auth-passport');
// app.use(passport.initialize());
// app.use(passport.session());


// routes
app.use(routers.routes());
app.use(routers.allowedMethods());

module.exports = app;

