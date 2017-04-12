// sample period min 6 months math 2 years
// generate back five years, yearly sample frequency prior to joining DPP

// generate health value randomly with a distribution curve
// mean at 35, standard dev at 20

// shift health score over time 5 to 10, 6 months to a year

const gaussian = require('gaussian');

const random = require('./random');
const model = require('./model');

const weightedTrajectories =
	Object.keys(model.trajectories).reduce((wt, key) => {
		wt[key] = model.trajectories[key].weight;
		return wt;
	}, {});

// Returns generated biodata
function generateBiodata() {
	// The date the user started logging biodata
	const start = random.date(model.dates.startRange[0], model.dates.startRange[1]);

	// The date the user last logged biodata
	const end = random.date(model.dates.endRange[0], model.dates.endRange[1]);

	const { mean, variance } = model.healthscore.distribution;

	// The user's healthscore
	const healthscore = Math.round(gaussian(1, variance).ppf(Math.random()) * mean);

	// The user's overall health trajectory
	const trajectory = random.weighted(weightedTrajectories);

	const gender = [ 'male', 'female' ][random.integer(0, 1)];

	const dataset = biodataset(start, end, healthscore, trajectory, gender);

	return {
		start,
		end,
		healthscore,
		trajectory,
		gender,
		dataset
	};
}

// Returns a biodata set
function biodataset(start, end, healthscore, trajectory, gender) {
	// For each interval, generate a random set of dates, and generate biodata
	// for the markers
	return Object.keys(model.intervals).reduce((dataset, key) => {
		const interval = model.intervals[key];
		const dates = random.dates(start, end, interval);
		const lastDate = dates[dates.length - 1];

		const timeline = getTrajectoryTimeline(trajectory, lastDate);

		key.split(',').forEach(type => {
			const data = { type, data: [] };

			dates.forEach(date => {
				// Using the healthscore and trajectory slope, determine healthscore factor for date
				const factor = getFactorForTrajectoryAtDate(trajectory, timeline, date);
				const factoredHealthscore = healthscore * factor;

				let healthscoreModel = model.healthscore[type];

				if (!healthscoreModel) { return; }

				if (healthscoreModel.male && healthscoreModel.female) {
					healthscoreModel = healthscoreModel[gender];
				}

				// look up marker value from model using nearest healthscore
				let value = healthscoreModel.reduce(
					(prev, curr) => {
						return (Math.abs(curr[0] - factoredHealthscore) < Math.abs(prev[0] - factoredHealthscore)) ? curr : prev;
					}
				)[1];

				// Adjust value with some gaussian randomness
				value = gaussian(1, .0001).ppf(Math.random()) * value;

				if (type == 'waist') { value = Math.round(value * 10) / 10; }

				data.data.push({ date, value });
			});

			dataset.push(data);
		});

		return dataset;
	}, []);
}

const day = 86400000;

function getFactorForTrajectoryAtDate(trajectory, timeline, date) {
	for (let i = 0; i < timeline.length - 1; ++i) {
		let point1 = timeline[i];
		let point2 = timeline[i + 1];

		let x1 = point1[0];
		let x2 = point2[0];
		let y1 = point1[1];
		let y2 = point2[1];

		let a = date.getTime();

		if (a >= x1 && a <= x2) {
			let m = (y2 - y1) / (x2 - x1);
			let b = m * (a - x1) + y1;

			return b;
		}
	}
	return 1;
}

function getTrajectoryTimeline(trajectory, end) {
	// Pull the candidate lines out of the model trajectory
	const { lines } = model.trajectories[trajectory];

	// Randomly select one of the candidates
	const line = lines[random.integer(0, lines.length - 1)];

	// Return the line converted to a timeline
	// (array of integer point arrays where point[0] is milliseconds since Jan 1 1970)
	return line.map(point => [ end.getTime() + point[0] * day, point[1] ]);
}

module.exports = generateBiodata;
