
const mongoose = require('mongoose');
const service = require('feathers-mongoose');

const hooks = require('../hooks');
const userSchema = require('../schemas/user');

const userModel = mongoose.model('user', userSchema);

module.exports = function () {
	const app = this;

	const options = {
		Model: userModel,
		paginate: {
			default: 5,
			max: 25
		},
		lean: true
	};

	// Initialize our service with any options it requires
	app.use('/users', service(options));

	// Get our initialize service to that we can bind hooks
	const users = app.service('/users');

	// Set up our before hooks
	users.before(before);

	// Set up our after hooks
	users.after(after);
};

const before = {
	all: [
		hooks.softDelete()
	],
	find: [
		hooks.verifyToken(),
		hooks.populateUser(),
		hooks.restrictToAuthenticated(),
		hooks.queryWithCurrentUser({ as: '_id' })
	],
	get: [
		hooks.verifyToken(),
		hooks.populateUser(),
		hooks.restrictToAuthenticated(),
		hooks.restrictToOwner({ ownerField: '_id' })
	],
	create: [
		hooks.hashPassword()
	],
	update: [
		hooks.verifyToken(),
		hooks.populateUser(),
		hooks.restrictToAuthenticated(),
		hooks.restrictToOwner({ ownerField: '_id' })
	],
	patch: [
		hooks.verifyToken(),
		hooks.populateUser(),
		hooks.restrictToAuthenticated(),
		hooks.restrictToOwner({ ownerField: '_id' })
	],
	remove: [
		hooks.verifyToken(),
		hooks.populateUser(),
		hooks.restrictToAuthenticated(),
		hooks.restrictToOwner({ ownerField: '_id' })
	]
};

const after = {
	all: [ hooks.remove('password') ],
	find: [],
	get: [],
	create: [],
	update: [],
	patch: [],
	remove: []
};
