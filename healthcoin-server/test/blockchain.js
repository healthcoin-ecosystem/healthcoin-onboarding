
const assert = require('assert');
const blockchain = require('../src/blockchain');

describe('blockchain integration', function () {
	it('writes a test message to the blockchain', (done) => {
		const amount = 1;
		const comment = 'Healthcoin test';

		blockchain.write(amount, comment, (err, result) => {
			if (err) { return done(err); }

			assert.ok(result);

			done();
		});
	});
});
