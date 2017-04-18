// See http://docs.feathersjs.com/hooks/readme.html

const feathersHooks = require('feathers-hooks');
const feathersHooksCommon = require('feathers-hooks-common');
const feathersAuthenticationHooks = require('feathers-authentication').hooks;

module.exports = Object.assign({},
	feathersHooks,
	feathersHooksCommon,
	feathersAuthenticationHooks
);
