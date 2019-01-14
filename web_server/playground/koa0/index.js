const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const request = require('supertest');
const assert = require('assert').strict;
const Router = require('koa-router');

const mongoose = require('mongoose');

const app = new Koa();
const router = new Router();

app.use(bodyParser());

app.use(router.routes());

// // response
// app.use(ctx => {
//   // the parsed body will store in ctx.request.body
//   // if nothing was parsed, body will be an empty object {}
//   ctx.body = ctx.request.body;
// });

router.all('/', async (ctx) => {
  console.log("headers: ---------");
  console.log(ctx.header);
});

router.all('/a', async (ctx) => {
  console.log('-- get request --');
  // ctx.request.body.should.equal( {foo: 'bar'} );
  // ctx.request.rawBody.should.equal('{"foo":"bar"}');

  assert.deepEqual(ctx.request.body, {foo: 'bar'});
  assert.equal(ctx.request.rawBody, '{"foo":"bar"}');

  ctx.body = ctx.request.body;
  console.log(ctx.body);
  console.log(ctx.request.rawBody);
});

module.exports = app;

// const server = app.listen(3333);

// const DbUri = "mongodb://localhost:27017/todolist_dev";
// mongoose.connect(DbUri, {
//   useNewUrlParser: true,
//   connectTimeoutMS: 10000,
//   keepAlive: true,
//   reconnectTries: 30,
// })
//   .then(() => {
//   console.warn('db connect success:', DbUri);
// }, (err) => {
//   console.warn('db connect failed', err);
// });
//
// mongoose.connection.close();
// server.close();

// request(server)
//   .post('/a')
//   .send({ foo: 'bar' })
//   .expect({ foo: 'bar' })
//   .end((err, res) => {
//     console.log("*****");
//     if (err) {
//       console.log("---err---");
//       console.log(err);
//     } else {
//       console.log("---res---");
//       // console.log(res);
//     }
//     server.close();
//   });