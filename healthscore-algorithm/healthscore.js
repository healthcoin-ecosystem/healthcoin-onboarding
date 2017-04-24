
const lookupNearest = require('./lookup-nearest');
const lookups = require('./healthscore-lookups');
const weights = require('./healthscore-weights');

function lookup(type, value) { return lookupNearest(lookups, type, value); }

function healthscore({ a1c, triglycerides, hdl, systolic, diastolic, waist, gender }) {

	const scores = {
		a1c:           lookup('a1c', a1c),
		triglycerides: lookup('triglycerides', triglycerides),
		hdl:           lookup('hdl', hdl),
		systolic:      lookup('systolic', systolic),
		diastolic:     lookup('diastolic', diastolic),
		waist:         lookup(`waist.${gender}`, waist)
	};

	const bloodPressureScore =
		(scores.systolic + scores.diastolic) / 2 * (scores.systolic / 100) * (scores.diastolic / 100);

	const weightedScores = {
		a1c:           scores.a1c * weights.a1c,
		triglycerides: scores.triglycerides * weights.triglycerides,
		hdl:           scores.hdl * weights.hdl,
		bloodPressure:	bloodPressureScore * weights.bloodPressure,
		waist:         scores.waist * weights.waist
	};

	const score =
		weightedScores.a1c +
		weightedScores.triglycerides +
		weightedScores.hdl +
		weightedScores.bloodPressure +
		weightedScores.waist;

	return Math.round(score * 10) / 10;
}

module.exports = healthscore;
