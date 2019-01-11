// import UserUtils from '../models/UserUtils';
// import User from '../models/User';

let f1 = function () {
  console.log('f1_old_old');
};

function main() {
  // console.log(User.users);

  // function f1() {
  //   console.log('f1_old');
  // }

  console.log('before f1');
  f1();
  console.log('after f1');
}

main();

f1 = function () {
  console.log('f1');
};

// function f1() {
//   console.log('f1_new_new');
// }