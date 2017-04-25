
module.exports = {
	host: 'localhost',
	port: 9000,
	mongodb: {
		connectionString: 'mongodb://localhost/healthcoin_dev'
	},
	public: '../public/',
	auth: {
		token: {
			secret: ''
		},
		local: {
		},
		successRedirect: '/dashboard'
	},
	recaptcha: {
		site: '',
		secret: ''
	},
	mail: {
		connectionString: '',
		connectionVerify: false,
		from: ''
	},
	blockchain: {
		connectionString: '',
		destination: ''
	},
	imageUpload: {
		fileStore: {
			path: './public/files',
			pathMatch: '(...).*',
			pathReplace: '$1/$&',
			url: '/files'
		},
		processes: {
			'large': {
				contain: true,
				width: 1280,
				height: 1280,
				mediaType: 'image/jpeg',
				quality: 75
			},
			'small': {
				cover: true,
				width: 128,
				height: 128,
				mediaType: 'image/jpeg',
				quality: 75
			}
		}
	}
};
