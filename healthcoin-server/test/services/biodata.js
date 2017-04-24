'use strict';

const assert = require('assert');
const app = require('../../src/app');
const mongoose = require('mongoose');

describe('biodata service', function () {
	it('registered the biodata service', () => {
		assert.ok(app.service('biodata'));
	});

	it('generates demo biodata', done => {
		const user = { _id: new mongoose.mongo.ObjectID('58f82a866c5545ccec5f2646') };

		app.service('biodata').create({ demo: true }, { user: user }, (err, result) => {
			if (err) { return done(err); }

			done();
		});
	});
});
