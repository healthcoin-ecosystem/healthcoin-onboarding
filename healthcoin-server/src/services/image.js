
const mongoose = require('mongoose');
const service = require('feathers-mongoose');
const feathersHooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;

const globalHooks = require('../hooks');
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
		}
	};

	// Initialize our service with any options it requires
	app.use('/images', imageUpload(), service(options));

	// Get our initialized service so that we can bind hooks
	const imageService = app.service('/images');

	// Set up our before hooks
	imageService.before(hooks.before);

	// Set up our after hooks
	imageService.after(hooks.after);
};

const hooks = {
	before: {
		all: [
			auth.verifyToken(),
			auth.populateUser(),
			auth.restrictToAuthenticated()
		],
		find: [],
		get: [],
		create: [
			globalHooks.setOwner()
		],
		update: [],
		patch: [],
		remove: []
	},
	after: {
		all: [],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: []
	}
};
