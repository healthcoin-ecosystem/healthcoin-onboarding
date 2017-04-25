
const blockchain = require('../blockchain');

function updateBlockchain(hook, next) {
	const amount = 1;
	const comment = 'Healthcoin test';

	// blockchain.write(amount, comment, (err, result) => {
	// 	if (err) { return next(err); }

	// 	next();
	// });
	next();
}

module.exports = () => updateBlockchain;
