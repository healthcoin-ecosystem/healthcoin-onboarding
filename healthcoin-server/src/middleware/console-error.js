
module.exports = () => {
	return (err, req, res, next) => {
		const status = err.status || err.code || 500;

		if (status == 500) {
			console.error(err);
		}

		next(err);
	};
};
