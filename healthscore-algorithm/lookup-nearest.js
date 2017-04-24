
const nearest = require('./nearest');

function lookupNearest(lookups, name, value) {
	let lookup = lookups[name];

	if (!lookup) { return null; }

	const element = nearest(lookup, value, element => element[1]);

	if (!element) { return null; }

	return element[0];
}

module.exports = lookupNearest;
