const Job = require('./Job');

class JobUtils {
  static async insertOne(jobInfo) {
    const job = new Job(jobInfo);
    return await job.save();
  }

  static async insertOne2(jobInfo) {
    const {deadline, name, desc, user} = jobInfo;
    const job = new Job({
      deadline,
      name,
      desc,
      'user.name':user.username,
    });
    return await job.save();
  }

  static async findByIdAndUpdate(id, jobInfoUpdated) {
    const {deadline, name, desc, user} = jobInfoUpdated;

    // only same user can update
    return await Job.findOneAndUpdate({
      _id: id,
      'user.id': user._id,
      'user.username': user.username,

      // user: {
      //   id: user.id,
      //   username: user.username,
      // }
    }, {
      deadline,
      name,
      desc,
      update_at: Date.now(),
    });
  }

  static async findById(id) {
    return await Job.findById(id);
  }

// TODO pagination
  static async findAllByUserId(userId) {
    const jobs = await Job.find(
      {
        'user.id': userId,
      },
    );
    return jobs;
  }

  static async findAll(){
    return await Job.find({});
  }

  static async deleteById(id) {
    return await Job.findByIdAndDelete(id);
  }

  static async deleteByIdAndUser(id, user) {
    Job.findOneAndDelete({
      _id: id,
      'user.id': user._id,
      'user.username': user.username,

      // user: {
      //   id: user._id,
      //   username:user.username,
      // }
    });
  }
}


module.exports = JobUtils;
