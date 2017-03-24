
module.exports = () => {
	return (err, req, res, next) => {
		if (status == 500) {
			console.error(err);
		}
		next(err);
	};
};
