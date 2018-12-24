
let _idCounter = 0;
const _users = [];

class User {
  static get idCounter() {return _idCounter;}
  static set idCounter(value) {_idCounter = value;}
  
  static get users() {return _users;}

  constructor(userInfo) {
    this.id = User.idCounter++;
    const {username, password} = userInfo;
    this.username = username;
    this.password = password;
  }
}

module.exports = User;