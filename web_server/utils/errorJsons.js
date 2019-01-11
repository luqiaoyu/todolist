
const generate4xxJson = (ctx, message, errorCode) => {
  ctx.status = errorCode;
  ctx.body = {
    ...ctx.body,
    success:false,
    token:null,

    message,
  }
};


const generate403Json = (ctx, message) => {
  generate4xxJson(ctx, message, 403);
};

const generate404Json = (ctx, message) => {
  generate4xxJson(ctx, message, 404);
};

const generate400Json = (ctx, message) =>{
  generate4xxJson(ctx, message, 400);
};

module.exports = {generate403Json,generate404Json,generate400Json};