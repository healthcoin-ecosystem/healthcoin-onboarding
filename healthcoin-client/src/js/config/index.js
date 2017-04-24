var env;
switch (process.env.NODE_ENV) {
  case 'production' :
    env = 'config.prod';
    break;
  default:
    env = 'config.dev';
    break;
}
module.exports = require(`./${env}`);
