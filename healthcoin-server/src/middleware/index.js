const errors = require('feathers-errors/handler');
const consoleError = require('./console-error');
const notFound = require('./not-found-handler');
const signup = require('./signup');

module.exports = function () {
	// Add your custom middleware here. Remember, that
	// just like Express the order matters, so error
	// handling middleware should go last.
	const app = this;

	app.post('/signup', signup(app));
	app.use(notFound());
	app.use(consoleError());
	app.use(errors());
};
