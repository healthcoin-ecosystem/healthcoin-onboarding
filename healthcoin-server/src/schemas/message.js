const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	userID: {
		type: mongoose.Schema.ObjectId,
		required: true
	},
	from: {
		type: String
	},
	to: {
		type: [ String ]
	},
	cc: {
		type: [ String ]
	},
	bcc: {
		type: [ String ]
	},
	subject: {
		type: String
	},
	text: {
		type: String
	},
	html: {
		type: String
	},
	attachments: {
		type: [ String ]
	},
	messageID: {
		type: String
	},
	envelope: {
		type: Object
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
