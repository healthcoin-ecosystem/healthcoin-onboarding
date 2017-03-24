
const path = require('path');

const envfile = require('node-env-file');

const env = process.env;

envfile(path.resolve(__dirname, '../', env.CONFIG || 'healthcoin.conf'), { raise: false });

// Must not require() config until env is set
const config = require('config');

module.exports = config;
