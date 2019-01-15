const User = require('./User');
const mongoose = require('mongoose');
const util = require('util');

class UserUtils {

  // return null if not exist
  // return specific user if exist
  static async findById(id) {
    return await User.findById(id);
  }

  static async findByUsername(username) {
    return await User.findOne({username});
  }

  static async insertByUserNamePassword(userInfo){
    if(!'username' in userInfo || !'password' in userInfo) {
      return null;
    }

    try{
      const user = new User(userInfo);
      return await user.save();
    } catch (e) {
      console.log('dup username');
      return null;
    }
  }
}

module.exports = UserUtils;