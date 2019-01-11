const Mongoose = require('mongoose');

const {Schema} = Mongoose;

const jobSchema = new Schema({
  // job
  name: String,
  desc: String,
  done: {type: Boolean, default: false},
  deadline: Date,
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},

  // user
  user: {
    id: String,
    username: String,
  },
}, {
  versionKey: false,
});

const Job = Mongoose.model('Job', jobSchema);


module.exports = Job;
