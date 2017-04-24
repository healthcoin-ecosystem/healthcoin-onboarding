
const mongoose = require('mongoose');
const service = require('feathers-mongoose');

const hooks = require('../hooks');
const groupSchema = require('../schemas/group');

const groupModel = mongoose.model('group', groupSchema);

module.exports = function () {
	const app = this;

	const options = {
		Model: groupModel,
		paginate: {
			default: 5,
			max: 25
		},
		lean: true
	};

	// Initialize our service with any options it requires
	app.use('/groups', service(options));

	// Get our initialized service so that we can bind hooks
	const groups = app.service('/groups');

	// Set up our before hooks
	groups.before(before);

	// Set up our after hooks
	groups.after(after);
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
