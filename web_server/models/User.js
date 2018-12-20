

class User {
  static idCounter = 0;

  static users = [];

  constructor(userInfo) {
    this.id = User.idCounter++;
    const {username, password} = userInfo;
    this.username = username;
    this.password = password;
  }
}

module.exports = User;