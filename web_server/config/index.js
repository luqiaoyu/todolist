const init = () => {
  let modeEnv = process.env.MODE;
  modeEnv = modeEnv === undefined ? 'development' : modeEnv.toLowerCase();

  const mode = (modeEnv !== 'production' && modeEnv !== 'test') ? 'development' : modeEnv;
  const baseConfig = {};
  return {mode, baseConfig};
};

const {mode, baseConfig} = init();

const developmentConfig = {
  ...baseConfig,
  mode: 'development',
  secret: "abcde",
  DbUri: "mongodb://localhost:27017/todolist_dev",
  PORT: 1567,
};

const testConfig = {
  ...baseConfig,
  mode: 'test',
  secret: "test_abcde",
  DbUri: "mongodb://localhost:27017/todolist_test",
  PORT: 2345,
};

const productionConfig = {
  ...baseConfig,
  mode: 'production'
};

const modeMap = {
  development: developmentConfig,
  test: testConfig,
  production: productionConfig,
};

const config = (mode in modeMap) ? modeMap[mode] : modeMap.development;
console.log('config:');
console.log(config);
module.exports = config;