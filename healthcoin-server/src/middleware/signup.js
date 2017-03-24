
const recaptcha = require('./recaptcha');

module.exports = app => {
	return (req, res, next) => {
		recaptcha.verify(req, err => {
			if (err) {
				return res.redirect('/signup.html');
			}

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
		});
	};
};
