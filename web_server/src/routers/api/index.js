const Router = require('koa-router');

const sessionApiRouters = require('./session');
const usersApiRouters = require('./users');
const jobsApiRouters = require('./jobs');

const apiRouter = new Router();

apiRouter.use(sessionApiRouters.routes());
apiRouter.use(usersApiRouters.routes());
apiRouter.use(jobsApiRouters.routes());

module.exports = apiRouter;