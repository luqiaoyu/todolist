const Router = require('koa-router');
// const passport = require('koa-passport');
const fs = require('fs');
// const queries = require('../db/queries/users');

const AuthUtils = require('../../utils/AuthUtils');

const router = new Router();



// login authentication
router.post('/api/session', async (ctx, next) => {
  const body = ctx.request.body;
  if (!('username' in body) && !('password' in body)) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      message: "username or password field not found!",
      token: null,
    };
  } else {
    const { username, password } = body;
    const user = await AuthUtils.getUserByUserInfo({ username, password });
    console.log("user:");
    console.log(user);
    if (user === null) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        message: "username or password wrong!",
        token: null,
      }
    } else {
      const token = await AuthUtils.generateTokenByUser(user);
      ctx.status = 200;
      ctx.body = {
        success: true,
        message: "authentication success!",
        token,
      }
    }
  }



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

router.delete('/api/session', async (ctx, next) => {
  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "deleted!",
  };
});


module.exports = router;