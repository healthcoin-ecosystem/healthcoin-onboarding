
const mongoose = require('mongoose');
const service = require('feathers-mongoose');

const hooks = require('../hooks');
const messageSchema = require('../schemas/message');

const messageModel = mongoose.model('message', messageSchema);

module.exports = function () {
	const app = this;

	const options = {
		Model: messageModel,
		paginate: {
			default: 5,
			max: 25
		},
		lean: true
	};

	// Initialize our service with any options it requires
	app.use('/messages', service(options));

	// Get our initialized service so that we can bind hooks
	const messages = app.service('/messages');

	// Set up our before hooks
	messages.before(before);

	// Set up our after hooks
	messages.after(after);
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
