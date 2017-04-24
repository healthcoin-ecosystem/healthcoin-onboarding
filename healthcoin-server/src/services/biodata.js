
const mongoose = require('mongoose');
const service = require('feathers-mongoose');

const hooks = require('../hooks');
const biodataSchema = require('../schemas/biodata');

const biodataModel = mongoose.model('biodata', biodataSchema, 'biodata');

module.exports = function () {
	const app = this;

	const options = {
		Model: biodataModel,
		paginate: {
			default: 5,
			max: 25
		},
		lean: true
	};

	// Initialize our service with any options it requires
	app.use('/biodata', service(options));

	// Get our initialized service so that we can bind hooks
	const biodata = app.service('/biodata');

	// Set up our before hooks
	biodata.before(before);

	// Set up our after hooks
	biodata.after(after);
};

const before = {
	all: [
		hooks.verifyToken(),
		hooks.populateUser(),
		hooks.restrictToAuthenticated(),
		hooks.softDelete()
	],
	find: [
		hooks.queryWithCurrentUser({ as: 'userID' })
	],
	get: [
		hooks.restrictToOwner({ ownerField: 'userID' })
	],
	create: [
		createDemoData,
		hooks.associateCurrentUser({ as: 'userID' }),
		hooks.setCreatedAt('created'),
		hooks.setUpdatedAt('updated')
	],
	update: [
		hooks.restrictToOwner({ ownerField: 'userID' }),
		hooks.setUpdatedAt('updated')
	],
	patch: [
		hooks.restrictToOwner({ ownerField: 'userID' }),
		hooks.setUpdatedAt('updated')
	],
	remove: [
		hooks.restrictToOwner({ ownerField: 'userID' })
	]
};

const after = {
	all: [],
	find: [],
	get: [],
	create: [],
	update: [],
	patch: [],
	remove: []
};

function createDemoData(hook) {
	if (hook.data.demo === true || hook.data.demo == 'true') {
		hook.data = require('../../demo/biodata');

		return hook.service.remove(null, { query: { userID: hook.params.user._id }}).then(() => hook);
	}
}
