
module.exports = app => {
	return function (req, res, next) {
		const body = req.body;

		const user = {
			email: body.email,
			password: body.password,
			firstname: body.firstname,
			lastname: body.lastname
		};

		app.service('users').create(user, (err, user) => {
			if (err) { return next(err); }

			res.redirect('/client.html');
		});
	};
};
