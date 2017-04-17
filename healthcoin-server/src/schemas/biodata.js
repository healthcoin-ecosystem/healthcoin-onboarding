const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	userID: {
		type: mongoose.Schema.ObjectId,
		required: true
	},
	type: {
		type: String
	},
	data: [{
		date: { type: Date },
		value: { type: String }
	}],
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
