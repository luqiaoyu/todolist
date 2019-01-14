const assert = require('assert');


let a = 0;


// before(() => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       a = 1;
//       resolve();
//     }, 200);
//   });
// });

before(async () => {
  const p = new Promise((resolve) => {
    setTimeout(() => {
      a = 1;
      resolve();
    }, 200);
  });
  await p;
});

it('a should be set to 1', () => {
  assert(a === 1);
});