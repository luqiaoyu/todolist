const Router = require('koa-router');
const passport = require('koa-passport');
const fs = require('fs');
// const queries = require('../db/queries/users');

const router = new Router();

router.get('/api/auth/register', async (ctx, next) => {
  // ctx.type = 'html';
  // ctx.body = fs.createReadStream('./src/server/views/register.html');
  console.log('/api/auth/register');
  ctx.body =
    {
      ...ctx.body,
      route: ctx.body.route + " -> api auth register",
      message: ctx.body.message + " register",
    };

  await next();
});

module.exports = router;