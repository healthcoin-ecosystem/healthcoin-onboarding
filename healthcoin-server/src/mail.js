
const config = require('config');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(config.get('mail.connectionString'));

if (config.get('mail.connectionVerify')) {
	transporter.verify((err, success) => {
		if (err) { console.error(err); }
	});
}

function send(message, callback) {
	message = Object.assign({}, message, {
		from: message.from || config.get('mail.from')
	});
	transporter.sendMail(message, callback);
}

module.exports = {
	send
};
