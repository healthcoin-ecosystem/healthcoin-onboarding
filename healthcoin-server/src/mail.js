
const config = require('config');
const nodemailer = require('nodemailer');

const connectionString = config.get('mail.connectionString');

const transporter = connectionString ? nodemailer.createTransport(connectionString) : null;

if (config.get('mail.connectionVerify')) {
	transporter.verify((err, success) => {
		if (err) { console.error(err); }
	});
}

function send(message, callback) {
	message = Object.assign({}, message, {
		from: message.from || config.get('mail.from')
	});

	if (!transporter) { return callback(null, message, {}); }

	transporter.sendMail(message, (err, info) => callback(err, message, info));
}

function store(messageService, userID, message, info, callback) {
	message = Object.assign({}, message, {
		userID,
		messageID: info.messageId,
		envelope: info.envelope
	});

	messageService.create(message, callback);
}

module.exports = {
	send,
	store
};
