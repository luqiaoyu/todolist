const Router = require('koa-router');

const AuthUtils = require('../../utils/AuthUtils');
const UserUtils = require('../../models/UserUtils');
const JobUtils = require('../../models/JobUtils');

const {checkLoggedIn} = require('../../middlewares/Authorization');
const {generate404Json, generate403Json, generate400Json} = require('../../utils/errorJsons');


const router = new Router();

// create a job
router.post('/api/jobs/', async (ctx, next) => {
  const {deadline, name, desc} = ctx.request.body;
  const {userLoggedIn} = ctx.state;
  if (userLoggedIn === null) {
    generate403Json("Not allowed to create job while not logged in.");
    return;
  }

  // if some error happens in mongoose, it will raise Internal Server Error.
  const job = await JobUtils.insertOne({
    name,
    desc,
    deadline,
    user: {
      id: userLoggedIn._id,
      username: userLoggedIn.username,
    },
  });

  ctx.body = {
    ...ctx.body,
    success: true,
    token: null,
    job,
  };
});

router.all('api/jobs/:id', async (ctx, next) => {
  const {id} = ctx.params;
  if (id === undefined) {
    generate404Json("Not found! Invalid input!");
    return;
  }

  ctx.state = {...ctx.state, idQuery: id};
  await next();
});

router.get('api/jobs/:id', async (ctx) => {
  const {idQuery} = ctx.state;
  const jobQuery = await JobUtils.findById(idQuery);

  // not required to login
  // every one can see any job
  if (jobQuery === null) {
    generate404Json("Job not found!");
    return;
  }

  ctx.body = {
    ...ctx.body,
    success: true,
    token: null,
    job: jobQuery
  };
});

router.put('api/jobs/:id', async (ctx) => {
  const {userLoggedIn, idQuery} = ctx.state;
  const {deadline, name, desc} = ctx.request.body;
  if (userLoggedIn === null) {
    generate403Json("Not allowed to update job while not logged in.");
    return;
  }

  const jobUpdated = await JobUtils.findByIdAndUpdate(idQuery, {
    deadline,
    name,
    desc,
    user: {
      id: userLoggedIn._id,
      username: userLoggedIn.username,
    },
  });

  ctx.body = {
    ...ctx.body,
    success: true,
    job: jobUpdated,
  }
});

router.delete('api/jobs/:id', async (ctx) => {
  const {userLoggedIn, idQuery} = ctx.state;
  if (userLoggedIn === null) {
    generate403Json("Not allowed to delete job while not logged in.");
    return;
  }



  const jobDeleted = await JobUtils.deleteByIdAndUser(idQuery, userLoggedIn);

  if (jobDeleted === null) {
    // no job found
    generate404Json("Job not found!");
  }

});

module.exports = router;