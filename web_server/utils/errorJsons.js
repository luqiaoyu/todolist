
const generate403Json = (ctx, message) => {
  ctx.status = 403;
  ctx.body = {
    success: false,
    token: null,

    message,
  }
};

const generate404Json = (ctx, message) => {
  ctx.status = 404;
  ctx.body = {
    success: false,
    token: null,

    message,
  }
};

module.exports = {generate403Json,generate404Json};