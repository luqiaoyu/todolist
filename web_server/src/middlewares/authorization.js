const AuthUtils = require('../utils/AuthUtils');
const {generate403Json} = require('../utils/errorJsons');
const authPrefix = "Bearer ";

// always called
// in any route
const tokenToUserLoggedIn = async function (ctx, next) {
  if (!'authorization' in ctx.header) {
    ctx.state = {...ctx.state, userLoggedIn: null};
    await next();
  } else {
    const {authorization} = ctx.header;
    if (typeof authorization !== 'string' || !authorization.startsWith(authPrefix)) {
      console.log("Authorization failed. token format wrong or undefined.");
      ctx.state = {...ctx.state, userLoggedIn: null};
      await next();
    } else {
      const token = authorization.substring(authPrefix.length);
      const userLoggedIn = await AuthUtils.getUserFromToken(token);
      if (userLoggedIn !== null) {
        // delete userLoggedIn['password'];
        userLoggedIn.password = "";
      } else {
        console.log("Authorization failed. bad token.");
      }
      ctx.state = {...ctx.state, userLoggedIn};
      await next();
    }
  }
};

// after
const checkLoggedIn = async function (ctx, next) {
  const {userLoggedIn} = ctx.state;
  if (userLoggedIn === undefined || userLoggedIn === null) {
    generate403Json(ctx, "Authorization failed. token error.");
  } else {
    await next();
  }
};

// const checkLoggedIn = async function (ctx, next) {
//   if (!'authorization' in ctx.header) {
//     // raise 403 forbidden
//     generate403Json(ctx, "Authorization failed. token header not found.");
//   } else {
//     const {authorization} = ctx.header;
//     if (typeof authorization !== 'string' || !authorization.startsWith(authPrefix)) {
//       generate403Json("Authorization failed. token format wrong.");
//     } else {
//       const token = authorization.substring(authPrefix.length);
//       const userLoggedIn = await AuthUtils.getUserFromToken(token);
//       if (userLoggedIn !== null) {
//         delete userLoggedIn['password'];
//         ctx.state = {...ctx.state, userLoggedIn};
//         await next();
//       } else {
//         generate403Json("Authorization failed. token error.");
//       }
//     }
//   }
// };


module.exports = {checkLoggedIn, tokenToUserLoggedIn};