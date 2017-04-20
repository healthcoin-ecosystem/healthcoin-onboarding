
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
		hooks.restrictToAuthenticated()
	],
	find: [
		hooks.queryWithCurrentUser({ as: 'userID' }),
		hooks.softDelete()
	],
	get: [
		hooks.restrictToOwner({ ownerField: 'userID' })
	],
	create: [
		// Allow internal service requests to create biodata
		hooks.iff(
			hooks.isProvider('external'),
			hooks.restrictToOwner({ ownerField: 'userID' })
		),
		hooks.associateCurrentUser({ as: 'userID' }),
		hooks.setCreatedAt('created')
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
		hooks.restrictToOwner({ ownerField: 'userID' }),
		hooks.softDelete()
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
