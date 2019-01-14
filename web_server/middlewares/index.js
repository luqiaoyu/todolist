const AuthorizationMiddlewares = require('./authorization');
const utilsMiddlewares = require('./utils');


module.exports = {...AuthorizationMiddlewares, ...utilsMiddlewares};