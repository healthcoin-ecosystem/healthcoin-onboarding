
const assert = require('assert');

const nearest = require('../nearest');

const testCases = [{
	value: 15,
	expected: 15,
	array: [ 0, 5, 10, 15, 20, 30, 40, 50 ]
}, {
	value: 25,
	expected: 20,
	array: [ 0, 5, 10, 15, 20, 30, 40, 50 ]
}, {
	value: -10,
	expected: 0,
	array: [ 0, 5, 10, 15, 20, 30, 40, 50 ]
}, {
	value: 100,
	expected: 50,
	array: [ 0, 5, 10, 15, 20, 30, 40, 50 ]
}, {
	value: 25,
	expected: 20,
	array: [ 0, 5, 10, 15, 20, 30, 40, 50 ]
}, {
	value: 25,
	expected: 30,
	array: [ 50, 40, 30, 20, 15, 10, 5, 0 ]
}];

it('finds the nearest value from an array', function () {
	testCases.forEach(testCase => {
		const actual = nearest(testCase.array, testCase.value, value => value);
		assert.equal(actual, testCase.expected);
	});
});
