const AuthUtils = require('../utils/AuthUtils');
const {generate403Json} = require('../utils/errorJsons');
const authPrefix = "Bearer ";

const checkToken = async function (ctx, next) {
  if (!'authorization' in ctx.header) {
    // raise 403 forbidden
    generate403Json(ctx, "Authorization failed. token header not found.");
  } else {
    const {authorization} = ctx.header;
    // console.log("authorization");
    // console.log(authorization);
    if (typeof authorization !== 'string' || !authorization.startsWith(authPrefix)) {
      generate403Json("Authorization failed. token format wrong.");
    } else {
      const token = authorization.substring(authPrefix.length);
      const user = await AuthUtils.getUserFromToken(token);
      if (user !== null) {
        delete user['password'];
        ctx.state = {...ctx.state, user};
        await next();
      } else {
        generate403Json("Authorization failed. token error.");
      }
    }
  }
};


module.exports = {checkToken};