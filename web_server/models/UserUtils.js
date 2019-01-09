const User = require('./User');

class UserUtils {

  // return null if not exist
  // return specific user if exist
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

  static async insertUser(userInfo) {
    const { username } = userInfo;
    const user0 = await this.getUserByUsername(username);
    if (user0 !== null) {
      // err = new Error("User already exists");
      return null;
    } else {
      const user = new User(userInfo);
      await User.users.push(user);
      return user;
    }
  }

  
}

module.exports = UserUtils;