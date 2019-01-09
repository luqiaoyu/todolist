const UserUtils = require('../models/UserUtils');
const jwt = require('jsonwebtoken');
const config = require('../config');
const util = require('util');


class AuthUtils {
  static async getUserByUserInfo(userInfo) {
    const {username, password} = userInfo;

    const user = await UserUtils.getUserByUsername(username);

    if (user === null) {
      throw new Error('User not found');
    } else if (user.password !== password) {
      throw new Error('Password incorrect');
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
      const user = await UserUtils.getUserByUsername(decode.username);
      return user;
    } catch (e) {
      return null;
    }
  }

  // user: User
  static async generateTokenByUser(user) {
    const token = await user.generateToken(null);
    return token;
  }

  static async InsertUserByUserInfo(userInfo) {
    return await UserUtils.insertUser(userInfo);
  }

  static test() {
    console.log("AuthUtils.test");
  }
}

module.exports = AuthUtils;