const UserUtils = require('../models/UserUtils');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const util = require('util');


class AuthUtils {
  static async getUserByUserInfo(userInfo) {
    const {username, password} = userInfo;

    const user = await UserUtils.findByUsername(username);

    if (user === null) {
      // throw new Error('User not found');
      return null;
    } else if (user.password !== password) {
      // throw new Error('Password incorrect');
      return null;
    } else {
      return user;
    }
  }

  static async checkToken(token) {
    return this.getUserFromToken(token) !== null;
  }

  static async getUserFromToken(token) {
    var decode = null;
    try {
      const verifyPromise = util.promisify(jwt.verify);
      decode = await verifyPromise(token, config.secret);

      if (decode.exp < (Date.now() / 1000 | 0)) {
        return false;
      }
      const user = await UserUtils.findByUsername(decode.username);
      return user;
    } catch (e) {
      return null;
    }
  }

  // user: User
  static async generateTokenByUser(user) {
    return await user.generateToken(null);
  }

  static async insertUserByUsernamePassword(userInfo) {
    return await UserUtils.insertByUserNamePassword(userInfo);
  }

  static test() {
    console.log("AuthUtils.test");
  }
}

module.exports = AuthUtils;