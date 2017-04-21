
const assert = require('assert');

const healthscoreWeights = {
	a1c:           .5,
	triglycerides: .05,
	hdl:           .2,
	bloodPressure: .15,
	waist:         .1
};

// Ensure weights add up to 1; throw an AssertionError if not.
assert.equal(Object.keys(healthscoreWeights).map(key => healthscoreWeights[key]).reduce((sum, value) => sum + value, 0), 1);

module.exports = healthscoreWeights;
