const Router = require('koa-router');
// const passport = require('koa-passport');
const fs = require('fs');
// const queries = require('../db/queries/users');

const AuthUtils = require('../../utils/AuthUtils');
const UserUtils = require('../../models/UserUtils');
const {checkToken} = require('../../middlewares/Authorization');
const {generate404Json, generate403Json} = require('../../utils/errorJsons');

const router = new Router();

router.all('/api/users/:id', async (ctx, next) => {
  const id = parseInt(ctx.params.id);
  if (isNaN(id)) {
    generate404Json("Not found. Invalid input!");
    return;
  }
  ctx.state = {...ctx.state, id};
  await next();
});

router.get('/api/users/:id', checkToken, async (ctx, next) => {
  const {id} = ctx.state;
  const userQuery = await UserUtils.getUserById(id);
  if (userQuery === null) {
    generate404Json(ctx, "username or password field not found!");
  } else if (!'user' in ctx.state) {
    generate403Json(ctx, "not logged in!");
  } else {
    const userLoggedIn = ctx.state.user;
    if (userLoggedIn.id === userQuery.id) {
      ctx.body = {
        user: userQuery,
      };
    } else {
      generate403Json(ctx, "not allowed to see other users.");
    }
  }
});

router.put('/api/users/:id', async (ctx, next) => {

});

router.post('/api/users/', async (ctx, next) => {
  // ctx.type = 'html';
  // ctx.body = fs.createReadStream('./src/server/views/register.html');
  console.log('POST /api/users');

  const {username, password} = ctx.request.body;


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

module.exports = router;