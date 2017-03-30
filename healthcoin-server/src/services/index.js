
const config = require('config');
const mongoose = require('mongoose');

const message = require('./message');
const authentication = require('./authentication');
const user = require('./user');
const image = require('./image');

module.exports = function () {
	const app = this;

	mongoose.connect(config.get('mongodb.connectionString'));
	mongoose.Promise = global.Promise;

	app.configure(authentication);
	app.configure(user);
	app.configure(message);
	app.configure(image);
};
