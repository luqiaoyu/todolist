const Router = require('koa-router');
const passport = require('koa-passport');
const fs = require('fs');
// const queries = require('../db/queries/users');

const router = new Router();

router.post('/api/auth/register', async (ctx, next) => {
  // ctx.type = 'html';
  // ctx.body = fs.createReadStream('./src/server/views/register.html');
  console.log('/api/auth/register');

  const { username, password } = ctx.request.body;

  




  // ctx.body = {
  //   ...ctx.body,
  //   route: ctx.body.route + " -> api auth register",
  //   message: ctx.body.message + " register",
  // };

  // const user = await queries.addUser(ctx.request.body);
  // passport.authenticate('local', (err, user, info, status) => {
  //   if (user) {
  //     ctx.login(user);
  //     ctx.redirect('/auth/status');
  //   } else {
  //     ctx.status = 400;
  //     ctx.body = { status: 'error' };
  //   }
  // })(ctx);

});

router.post('/api/auth/login', async (ctx, next) => {



  // return passport.authenticate('local', (err, user, info, status) => {
  //   if (user) {
  //     ctx.login(user);
  //     ctx.redirect('/auth/status');
  //   } else {
  //     ctx.status = 400;
  //     ctx.body = { status: 'error' };
  //   }
  // })(ctx);
});

module.exports = router;