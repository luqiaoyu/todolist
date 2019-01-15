const config = require('../../config');
const util = require('util');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const {Schema} = mongoose;

const userSchema = new Schema(
  {
    username: {type: String, unique: true},
    password: String
  },
  {versionKey: false});

let _idCounter = 0;
const _users = [];

// var schema = new Schema(
//   {
//     name: String,
//     binary: Buffer,
//     living: Boolean,
//     updated: {type: Date, default: Date.now()},
//     age: {type: Number, min: 18, max: 65, required: true},
//     mixed: Schema.Types.Mixed,
//     _someId: Schema.Types.ObjectId,
//     array: [],
//     ofString: [String], // You can also have an array of each of the other types too.
//     nested: {stuff: {type: String, lowercase: true, trim: true}}
//   });

class UserExtraImpl {
  async generateToken(expiresIn) {
    const {username} = this;

    const signPromise = util.promisify(jwt.sign);
    const encoded = await signPromise({username,}, config.secret, {expiresIn: (expiresIn === null ? 3600 : expiresIn)});
    return encoded;
  }
}

userSchema.loadClass(UserExtraImpl);

const User = mongoose.model('User', userSchema);

module.exports = User;


// class User2 {
//   static get idCounter() {
//     return _idCounter;
//   }
//
//   static set idCounter(value) {
//     _idCounter = value;
//   }
//
//   static get users() {
//     return _users;
//   }
//
//   constructor(userInfo) {
//     this.id = _idCounter++;
//     const {username, password} = userInfo;
//     this.username = username;
//     this.password = password;
//   }
//
//   async generateToken(expiresIn) {
//     const {username} = this;
//
//     const signPromise = util.promisify(jwt.sign);
//     const encoded = await signPromise({username,}, config.secret, {expiresIn: (expiresIn === null ? 3600 : expiresIn)});
//     return encoded;
//   }
// }

// _users.push(new User({username: "zzz", password: "33333"}));
// _users.push(new User({username: "zyx", password: "44444"}));

// module.exports = User;