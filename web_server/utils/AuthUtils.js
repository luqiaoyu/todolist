const UserUtils = require('../models/UserUtils');

class AuthUtils {
  static async checkUserInfo(userInfo) {
    const { username, password } = userInfo;
    
    const user = await UserUtils.getUserByUsername(username);

    if (user === null) {
      throw new Error('User not found');
    } else if (user.password !== password) {
      throw new Error('Password incorrect');
    } else {
      return user;
    }
  }

  static async InsertUserByUserInfo(userInfo) {
    return await UserUtils.insertUser(userInfo);
  }


  static test() {
    console.log("AuthUtils.test");
  }
}

module.exports = AuthUtils;