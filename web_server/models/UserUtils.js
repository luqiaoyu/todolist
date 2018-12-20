const User = require('./Users');

class UserUtils {

  static async getUserById(id) {

    const targetUsers = User.users.filter(u => u.id === id);
    if (!Array.isArray(targetUsers) || !targetUsers.length) {
      return null;
    } else {
      return targetUsers[0];
    }
  }

  static async getUserByUsername(username) {
    const targetUsers = User.users.filter(u => u.username === username);
    if (!Array.isArray(targetUsers) || !targetUsers.length) {
      return null;
    } else {
      return targetUsers[0];
    }
  }

  // static insertUser(userInfo, callback) {
  //   const { username } = userInfo;
  //   const err = null;
  //   const user = null;
  //   if (getUserByUsername(username) !== null) {
  //     err = new Error("User already exists");
  //   } else {
  //     user = new User(userInfo);
  //     User.users.push(user);
  //   }
  //   callback(err, user);
  // }

  static async insertUser(userInfo) {
    const { username } = userInfo;
    const user0 = await getUserByUsername(username);
    if (user0 !== null) {
      // err = new Error("User already exists");
      throw new Error("User already exists");
    } else {
      user = new User(userInfo);
      await User.users.push(user);
      return user;
    }
  }
}

module.exports = UserUtils;