const Router = require('koa-router');

const authApiRouters = require('./auth');

const apiRouter = new Router();

apiRouter.use(authApiRouters.routes());


module.exports = apiRouter;