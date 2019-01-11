const cascadeMiddlewares = function (mid1, mid2) {
  return async (ctx, next) => {
    const curr = async () => {
      mid2(ctx, next);
    };
    await mid1(ctx, curr);
  };
};
const addStateInContext = async (ctx, next) => {
  if(!'state' in ctx){
    ctx.state={};
  }
  await next();
};

module.exports = {cascadeMiddlewares, addStateInContext};