
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
