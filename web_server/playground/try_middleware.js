const mid0 = async (req, next) => {
  const res = {};
  const res1 = {...res, ...(await next())};
  return res;
};


const cascadeMiddleware = (mid1, mid2) => {
  return async (req, next) => {
    return await mid1(req, mid2);
  };
};