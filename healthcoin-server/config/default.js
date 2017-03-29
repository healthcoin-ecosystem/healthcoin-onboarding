
module.exports = {
	host: 'localhost',
	port: 9000,
	mongodb: {
		connectionString: 'mongodb://localhost:27017/healthcoin_dev'
	},
	public: '../public/',
	auth: {
		token: {
			secret: ''
		},
		local: {
		},
		successRedirect: '/client.html'
	},
	recaptcha: {
		site: '',
		secret: ''
	},
	mail: {
		connectionString: '',
		connectionVerify: false,
		from: ''
	}
};
