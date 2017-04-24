
const assert = require('assert');

const lookupNearest = require('../lookup-nearest');

const lookups = {
	foo: [ [0, 0], [1, 5], [2, 10], [3, 15], [4, 20] ]
}

it('looks up the nearest value from a set of lookup tables', function () {
	const actual = lookupNearest(lookups, 'foo', 11);

	assert.equal(actual, 2);
});
