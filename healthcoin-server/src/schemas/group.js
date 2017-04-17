const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	name: {
		type: String
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
