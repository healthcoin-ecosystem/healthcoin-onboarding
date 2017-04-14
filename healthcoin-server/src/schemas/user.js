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
	firstname: {
		type: String
	},
	lastname: {
		type: String
	},
	roles: {
		type: [ String ]
	},
	group: {
		type: mongoose.Schema.ObjectId,
	},
	created: {
		type: Date,
		'default': Date.now
	},
	modified: {
		type: Date,
		'default': Date.now
	},
	deleted: {
		type: Boolean
	}
});
