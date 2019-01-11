const AuthorizationMiddlewares = require('./Authorization');
const utilsMiddlewares = require('./utils');


module.exports = {...AuthorizationMiddlewares, ...utilsMiddlewares};