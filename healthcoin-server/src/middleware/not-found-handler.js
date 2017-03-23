const errors = require('feathers-errors');

module.exports = () => {
	return (req, res, next) => {
		next(new errors.NotFound('Page not found'));
	};
};
