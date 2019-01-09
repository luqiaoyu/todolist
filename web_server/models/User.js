const config = require('../config');
const util = require('util');
const jwt = require('jsonwebtoken');

let _idCounter = 0;
const _users = [];

class User {
  static get idCounter() { return _idCounter; }
  static set idCounter(value) { _idCounter = value; }

  static get users() { return _users; }

  constructor(userInfo) {
    this.id = User.idCounter++;
    const { username, password } = userInfo;
    this.username = username;
    this.password = password;
  }

  async generateToken(expiresIn) {
    const { username } = this;

    const signPromise = util.promisify(jwt.sign);
    const encoded = await signPromise({ username, }, config.secret, { expiresIn: (expiresIn === null ? 3600 : expiresIn) });
    return encoded;
  }
}

_users.push(new User({username:"zzz", password:"33333"}));
_users.push(new User({username:"zyx", password:"44444"}));

module.exports = User;