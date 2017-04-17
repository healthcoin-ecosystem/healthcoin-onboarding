
// Returns an ordered set of dates between <min> and <max> with a random
// period of <interval>
function dates(min, max, interval) {
	const dates = [];

	let date = new Date(min.getTime() + integer(interval.min, interval.max) * 86400000 / 2);
	while (date < max) {
		dates.push(date);
		date = new Date(date.getTime() + integer(interval.min, interval.max) * 86400000);
	}

	return dates;
}

// Returns a random key based on weight values
function weighted(weights) {
	const totalWeight =
		Object.keys(weights).reduce((total, key) => total + weights[key], 0);

	const random = Math.random() * totalWeight;

	let sum = 0;

	for (let key of Object.keys(weights)) {
		const weight = weights[key];
		sum += weight;
		if (random <= sum) { return key; }
	}
}

function integer(min, max) {
	const random = Math.random();

	return Math.floor(min + random * (max + 1 - min));
}

function date(min, max) {
	min = min instanceof Date ? min : new Date(min);
	max = max instanceof Date ? max : new Date(max);

	const random = Math.random();

	return new Date(min.getTime() + random * (max.getTime() - min.getTime()));
}

module.exports = {
	dates,
	weighted,
	integer,
	date
};
