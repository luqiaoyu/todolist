const Router = require('koa-router');
const apiRouters = require('./api');

const router = new Router();

// response
router.use(async (ctx, next) => {
  console.log("all through");
  await next();
});

router.get('/test', async (ctx) => {
  console.log("test success");
  ctx.body = {
    ...ctx.body,
    message:"match /test",
  };
});

// 只匹配 /
router.all('/', async (ctx) => {
  console.log("match /");
  ctx.body = {
    ...ctx.body,
    message:"match /",
  };
});

router.use(apiRouters.routes());

module.exports = router;
