
const config = require('../../config');
const authentication = require('feathers-authentication');

module.exports = function () {
	const app = this;

	const auth = authentication(config.get('auth'));

	app.configure(auth);
};
