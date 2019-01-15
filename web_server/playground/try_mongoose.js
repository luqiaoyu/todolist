const User = require('../src/models/User');
const UserUtils = require('../src/models/UserUtils');
const Job = require('../src/models/Job');
const JobUtils = require('../src/models/JobUtils');

require('../src/db');

const mongoose = require('mongoose');
const util = require('util');

const main = async function () {
  await User.deleteMany();
  await Job.deleteMany();
  try {
    const user1 = new User({username: "zzz", password: "33333"});
    const user1_1 = await user1.save();
    console.log('user1');
    console.log(user1);
    console.log('user1_1');
    console.log(user1_1);

    const user1_2 = new User({username: "zzz1", password: "55555"});
    await user1_2.save();

    const job0 = await JobUtils.insertOne({
      name:"name0",
      desc:"job1 with ddl",
      deadline:Date.now() + 86400 * 1000,
      user: {
        id: user1_1._id,
        username: user1_1.username,
      },
    });

    console.log('-------');
    console.log('job:');
    console.log(job0);
    console.log('-------');

    // const res = await Job.findByIdAndDelete(job0._id);
    const res = await Job.findOneAndDelete({
      _id: job0._id,
      'user.id':user1_1._id,
      'user.username':user1_1.username,

      // user:{
      //   id:user1_1._id,
      //   username: user1_1.username,
      // }
    });
    console.log('res:');
    console.log(res);
    console.log('-------');

    const res2 = await Job.findByIdAndDelete('5c3824bc5e660b80ee382deb');
    console.log('res2:');
    console.log(res2);
    console.log('-------');

    const job1 = await JobUtils.insertOne({
      name:"name1",
      desc:"job2 with ddl",
      deadline:Date.now() + 86400 * 1000,
      user: {
        id: user1_1._id,
        username: user1_1.username,
      },
    });

  } catch (e) {
    console.log(e);
  }

  const user2 = await User.find({});
  console.log(user2);


};

main()
  .then(() => {
    return User.deleteMany();
  })
  .then(() => {
    return mongoose.connection.close();
  })
  .then(() => {
    console.log('finished!');
  });

