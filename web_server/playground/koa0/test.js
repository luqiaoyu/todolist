const app = require('./index');
const request = require('supertest');
const assert = require('assert').strict;
const util = require('util');
const server = app.listen(3334);


after(() => {
  // server.close();
});

describe('POST /a', function () {
  it('response with json', function (done) {
    request(server)
      .post('/a')
      .send({foo: 'bar'})
      .expect({foo: 'bar'})
      .end((err, res) => {
        console.log("*****");
        if (err) {
          console.log("---err---");
          console.log(err);
        } else {
          console.log("---res---");
          // console.log(res);
        }

        // server.close(done);
        // util.promisify(server.close).apply(server).then(done);

        (async () => {
          await util.promisify(server.close).apply(server);
          done();
        })()
      });
  })
});

// describe('POST /a', function () {
//   it('response with json', function (done) {
//     // let p = Promise.resolve();
//     request(server)
//       .post('/a')
//       .send({foo: 'bar'})
//       .expect({foo: 'bar'})
//       .end((err, res) => {
//         console.log("*****");
//         if (err) {
//           console.log("---err---");
//           console.log(err);
//         } else {
//           console.log("---res---");
//           // console.log(res);
//         }
//
//         p = util.promisify(server.close).apply(server);
//       });
//     // await p;
//     done();
//     console.log("p is finished");
//   })
// });