
const assert = require('assert');

const healthscore = require('../healthscore');

const biodata = [{
	gender: 'male',
	a1c: 7,
	hdl: 44,
	triglycerides: 272,
	systolic: 125,
	diastolic: 80,
	waist: 53,
	expected: 39.5
}];

it('computes healthscores', function () {
	biodata.forEach(biodata => {
		const score = healthscore(biodata);

		assert.equal(score, biodata.expected);
	});
});
