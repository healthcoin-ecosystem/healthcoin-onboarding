
const mail = require('../mail');
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

				const siteUrl = getSiteUrl(req);

				sendWelcomeMessage(siteUrl, user.email, err => console.error);

				res.redirect('/client.html');
			});
		});
	};
};

function getSiteUrl(req) {
	return req.protocol + '://' + req.get('host');
}

function sendWelcomeMessage(siteUrl, email, callback) {
	const url = siteUrl + '/login.html';

	// TODO: Email templates are coming in a future sprint, for now just hard-code
	const message = {
		to: email,
		subject: 'Welcome to Healthcoin',
		text: `Welcome to Healthcoin! Use this link to sign in: ${url}`,
		html: `
			<html>
				<head></head>
				<body>
					Welcome to Healthcoin! Use this link to log in:
					<br/>
					<br/>
					<a href="${url}">Log In to Healthcoin</a>
				</body>
			</html>
		`
	};

	mail.send(message, callback);
}
