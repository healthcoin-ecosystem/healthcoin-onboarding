const authentication = require('feathers-authentication');

module.exports = function () {
	const app = this;

	const config = app.get('auth');
	const auth = authentication(config);

	app.configure(auth);
};
