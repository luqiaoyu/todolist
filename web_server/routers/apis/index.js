const Router = require('koa-router');

const sessionApiRouters = require('./session');
const userApiRouters = require('./users');

const apiRouter = new Router();

apiRouter.use(sessionApiRouters.routes());
apiRouter.use(userApiRouters.routes());


module.exports = apiRouter;