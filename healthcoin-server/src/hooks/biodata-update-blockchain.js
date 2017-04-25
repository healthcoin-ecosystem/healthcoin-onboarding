
const crypto = require('crypto');
const config = require('config');
const blockchain = require('../blockchain');

function updateBlockchain(hook, next) {
	if (!hook.params.user || !hook.result || !hook.result.type || !hook.result.data) { return next(); }

	const amount = 30;
	const userID = hook.params.user._id;
	const result = hook.result;
	const datapoint = result.data[result.data.length - 1];
	const data = { userID, type: result.type, date: datapoint.date, value: datapoint.value };
	const digest = hmacDigest(JSON.stringify(data), 'hex');
	const comment = 'healthcoins-granted ' + digest;

	blockchain.write(amount, comment, (err, result) => {
		if (err) { return next(err); }

		next();
	});
}

const secret = config.get('blockchain.secret');

function hmacDigest(data, encoding) {
	const hmac = crypto.createHmac('sha256', secret);
	hmac.update(data);
	return hmac.digest(encoding);
}

module.exports = () => updateBlockchain;
