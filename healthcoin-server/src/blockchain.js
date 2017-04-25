
const config = require('config');
const jayson = require('jayson');

const connectionString = config.get('blockchain.connectionString');
const destination = config.get('blockchain.destination');

const client = jayson.client.http(connectionString);

function write(amount, comment, callback) {
	amount = amount || 0;
	comment = (comment || '').toString().substr(0, 1024);

	client.request('sendtoaddress', [ destination, amount, '', '', comment ], (err, res) => {		if (err) { return callback(err); }

		callback(null, res);
	});
}

module.exports = {
	write
};
