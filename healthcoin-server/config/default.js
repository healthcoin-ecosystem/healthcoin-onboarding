
module.exports = {
	host: 'localhost',
	port: 9000,
	mongodb: {
		connectionString: 'mongodb://localhost:27017/healthcoin_dev'
	},
	public: '../public/',
	auth: {
		token: {
			secret: 'AUTH_TOKEN_SECRET'
		},
		local: {
		},
		successRedirect: '/client.html'
	},
	recaptcha: {
		site: 'RECAPTCHA_SITE',
		secret: 'RECAPTCHA_SECRET'
	},
	mail: {
		connectionString: 'MAIL_CONNECTION_STRING',
		connectionVerify: 'MAIL_CONNECTION_VERIFY',
		from: 'MAIL_FROM'
	}
};
