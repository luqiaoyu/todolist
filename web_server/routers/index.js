const Router = require('koa-router');
const router = new Router();
const authApiRouters = require('./apis/auth');

// response
router.use(async (ctx, next) => {
  console.log("all through");
  ctx.body = { route: "all through", message: "all-through" };
  await next();
});



// 只匹配 /
router.all('/', async (ctx, next) => {
  console.log("match /");
  ctx.body = {
    ...ctx.body,
    route: ctx.body.route + " -> /",
    message: ctx.body.message + " home",
  };
  await next();
});

router.use(authApiRouters.routes());


module.exports = router;