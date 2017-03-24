
const config = require('config');

const message = require('./message');
const authentication = require('./authentication');
const user = require('./user');
const mongoose = require('mongoose');

module.exports = function () {
	const app = this;

	mongoose.connect(config.get('mongodb.connectionString'));
	mongoose.Promise = global.Promise;

	app.configure(authentication);
	app.configure(user);
	app.configure(message);
};
