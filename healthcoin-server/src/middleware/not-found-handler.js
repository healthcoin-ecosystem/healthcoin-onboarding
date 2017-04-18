const errors = require('feathers-errors');

module.exports = () => {
	return (req, res, next) => {
		const err = new errors.NotFound('Page not found');
		err.status = 404;
		next(err);
	};
};
