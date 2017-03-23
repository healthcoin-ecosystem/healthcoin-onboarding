const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	text: {
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
