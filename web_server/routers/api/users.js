const Router = require('koa-router');
// const passport = require('koa-passport');
// const queries = require('../db/queries/users');

const AuthUtils = require('../../utils/AuthUtils');
const UserUtils = require('../../models/UserUtils');
const {checkLoggedIn} = require('../../middlewares/Authorization');
const {generate404Json, generate403Json, generate400Json} = require('../../utils/errorJsons');

const router = new Router();

router.all('/api/users/:username', async (ctx, next) => {
  // const username = parseInt(ctx.params.username);
  const {username} = ctx.params;
  if (username === undefined || username === "") {
    generate404Json("Not found. Invalid input!");
    return;
  }
  ctx.state = {...ctx.state, usernameQuery: username};
  await next();
});

router.get('/api/users/:username', checkLoggedIn, async (ctx) => {
  const {usernameQuery} = ctx.state;
  const userQuery = await UserUtils.findByUsername(usernameQuery);

  if (!'userLoggedIn' in ctx.state) {
    generate403Json(ctx, "not logged in!");
    return;
  }
  if (userQuery === null) {
    generate404Json(ctx, "not allowed to see other users 0!");
    return;
  }

  const {userLoggedIn} = ctx.state;
  if (userLoggedIn.username === userQuery.username) {
    ctx.body = {
      ...ctx.body,
      success: true,
      token: null,
      user: userQuery,
    };
  } else {
    generate403Json(ctx, "not allowed to see other users 1!");
  }
});

router.put('/api/users/:username', async (ctx, next) => {

});

router.post('/api/users', async (ctx) => {
  console.log('POST /api/users');

  const {username, password} = ctx.request.body;

  const user = await AuthUtils.insertUserByUsernamePassword({username, password});

  if (user === null) {
    generate400Json(ctx, "bad request");
  } else {
    const token = await AuthUtils.generateTokenByUser(user);
    ctx.body = {
      ...ctx.body,
      success: true,
      message: "sign up success!",

      token,
      user,
    }
  }
});

module.exports = router;