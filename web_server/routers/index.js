const Router = require('koa-router');
const apiRouters = require('./apis');

const router = new Router();

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

router.use(apiRouters.routes());

module.exports = router;
