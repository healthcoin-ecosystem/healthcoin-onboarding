
const mongoose = require('mongoose');
const service = require('feathers-mongoose');

const hooks = require('../hooks');
const imageSchema = require('../schemas/image');
const imageUpload = require('../middleware/image-upload');

const imageModel = mongoose.model('image', imageSchema);

module.exports = function () {
	const app = this;

	const options = {
		Model: imageModel,
		paginate: {
			default: 5,
			max: 25
		},
		lean: true
	};

	// Initialize our service with any options it requires
	app.use('/images', imageUpload(), service(options));

	// Get our initialized service so that we can bind hooks
	const images = app.service('/images');

	// Set up our before hooks
	images.before(before);

	// Set up our after hooks
	images.after(after);
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
		hooks.restrictToOwner({ ownerField: 'userID' }),
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
