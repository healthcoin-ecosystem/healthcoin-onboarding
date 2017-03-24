
module.exports = () => {
	return (err, req, res, next) => {
		const status = err.status || 500;

		if (status == 500) {
			console.error(err);
		}

		next(err);
	};
};
