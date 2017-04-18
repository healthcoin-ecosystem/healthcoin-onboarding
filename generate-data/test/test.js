
const assert = require('assert');
const generateBiodata = require('../generate-biodata');

it('generates biodata', function () {
	const biodata = generateBiodata();
	assert.ok(biodata);
});
