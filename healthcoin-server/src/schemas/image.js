const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	userID: {
		type: mongoose.Schema.ObjectId,
		required: true
	},
	filename: {
		type: String
	},
	hash: {
		type: String
	},
	files: [{
		store: { type: String },
		process: { type: String },
		key: { type: String },
		url: { type: String }
	}],
	created: {
		type: Date,
		'default': Date.now
	},
	modified: {
		type: Date,
		'default': Date.now
	}
});
