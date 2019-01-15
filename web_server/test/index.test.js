process.env.MODE = 'test';

const assert = require('assert');
const request = require('supertest');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const mongoose = require('mongoose');
const util = require('util');


const User = require('../src/models/User');
const UserUtils = require('../src/models/UserUtils');
const Job = require('../src/models/Job');
const JobUtils = require('../src/models/JobUtils');


const PORT = process.env.PORT || 1337;
const app = require('../src/app');
require('../src/db');

// close the server after each test
after(() => {
  mongoose.connection.close();
});


describe('routes : index', () => {

  describe('GET /', () => {
    it('should return json', (done) => {
      chai.request(app.listen(PORT))
        .get('/')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          res.body.success.should.equal(true);
          res.body.message.should.eql('match /');
          done();
        });
    });
  });

  describe('GET /test', () => {
    it('should return json', (done) => {
      chai.request(app.listen(PORT))
        .get('/test')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          res.body.success.should.equal(true);
          res.body.message.should.eql('match /test');
          done();
        });
    });
  });

});

describe('test mongoose actions', () => {
  beforeEach(async () => {
    await User.deleteMany();
    await Job.deleteMany();
  });

  afterEach(async () => {
    console.log("finish one!\n");
  });

  it('add, update and delete user and job', async () => {
    const user1 = new User({username: "zzz", password: "33333"});
    user1.save();

    const user2 = new User({username: "zzz1", password: "55555"});
    user2.save();

    const job0 = await JobUtils.insertOne({
      name: "name0",
      desc: "job0 with ddl",
      deadline: Date.now() + 86400 * 1000,
      user: {
        id: user2._id,
        username: user2.username,
      },
    });
    should.exist(job0);

    // const res = await Job.findOneAndDelete({
    //   _id: job0._id,
    //   'user.id':user2._id,
    //   'user.username':user2.username,
    //
    //   // user:{
    //   //   id:user1_1._id,
    //   //   username: user1_1.username,
    //   // }
    // });
    // should.exist(res);

    const res2 = await JobUtils.findByIdAndUpdate(job0._id, {
      deadline: Date.now() + 86400 * 1000 * 2,
      name: "name0_updated",
      desc: "job0 updated",
      user: user2
    });
    should.exist(res2);

    const job1 = await JobUtils.insertOne({
      name: "name1",
      desc: "job1 with ddl",
      deadline: Date.now() + 86400 * 1000 * 10,
      user: {
        id: user1._id,
        username: user1.username,
      },
    });
    should.exist(job1);
  });

  it("test api for user", async () => {
    chai.request(app.listen(PORT))
      .post('/api/users')
      .set('content-type', 'application/json')
      .send({username: "test_api_user1", password: "abcdef"})
      .then(async res=>{
        res.status.should.eql(200);
        res.type.should.eql('application/json');
        res.body.success.should.equal(true);
        should.exist(res.body.token);
        res.body.message.should.eql('match /test');
        should.exist(res.body.user);

        const user = await UserUtils.findById(res.body.user._id);
        should.exist(user);
        user.username.should.eql("test_api_user1");

        
      })
      .catch(err=>{
        should.not.exist(err);
        return Promise.reject("error happens on sending request to POST /api/users");
      })
  });

  it("test jobs api", async()=>{
    const res = await chai.request(app.listen(PORT))
      .post('/api/users')
      .set('content-type', 'application/json')
      .send({username: "test_api_user1", password: "abcdef"});

    should.exist(res.body.token);

  });
});
