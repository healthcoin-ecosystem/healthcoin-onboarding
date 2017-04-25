// See http://docs.feathersjs.com/hooks/readme.html

const feathersHooks = require('feathers-hooks');
const feathersHooksCommon = require('feathers-hooks-common');
const feathersAuthenticationHooks = require('feathers-authentication').hooks;
const biodataFindCohort = require('./biodata-find-cohort');
const biodataCreateDemo = require('./biodata-create-demo');
const biodataUpdateBlockchain = require('./biodata-update-blockchain');

module.exports = Object.assign({ biodataFindCohort, biodataCreateDemo, biodataUpdateBlockchain },
	feathersHooks,
	feathersHooksCommon,
	feathersAuthenticationHooks
);
