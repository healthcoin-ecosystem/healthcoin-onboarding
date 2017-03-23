const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	created: {
		type: Date,
		'default': Date.now
	},
	updated: {
		type: Date,
		'default': Date.now
	}
});
