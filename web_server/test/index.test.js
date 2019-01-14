process.env.NODE_ENV = 'test';

const assert = require('assert');

// const request = require('supertest');
const chai = require('chai');

const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('./../index');
const mongoose = require('mongoose');

const User = require('../models/User');
const UserUtils = require('../models/UserUtils');
const Job = require('../models/Job');
const JobUtils = require('../models/JobUtils');

const util = require('util');


// close the server after each test
after(() => {
  // server.close();
  mongoose.connection.close();
});


describe('routes : index', () => {

  describe('GET /', () => {
    it('should return json', (done) => {
      chai.request(server)
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
      chai.request(server)
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
    return await Job.deleteMany();
  });

  it('xxx', done => {
    done();
  });
});
