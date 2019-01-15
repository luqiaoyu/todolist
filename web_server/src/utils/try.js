const AuthUtils = require("./AuthUtils");
// const UserUtils = require("../models/UserUtils");
const User = require("../models/User");


const main = async () => {
  await AuthUtils.insertUserByUsernamePassword({username:"aaa", password:"12345"});
  await AuthUtils.insertUserByUsernamePassword({username:"bbb", password:"23456"});
  await AuthUtils.insertUserByUsernamePassword({username:"aaa", password:"34567"});
  console.log(User.users);
};

main();