(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.healthscore = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

const healthscoreLookups = {
	a1c: [
		[ 100, 2.00 ],
		[ 100, 2.19 ],
		[ 100, 2.37 ],
		[ 100, 2.56 ],
		[ 100, 2.74 ],
		[ 100, 2.93 ],
		[ 100, 3.11 ],
		[ 100, 3.30 ],
		[ 100, 3.48 ],
		[ 100, 3.67 ],
		[ 100, 3.85 ],
		[ 100, 4.04 ],
		[ 100, 4.22 ],
		[ 100, 4.41 ],
		[ 100, 4.59 ],
		[ 98, 4.78 ],
		[ 96, 4.96 ],
		[ 94, 5.15 ],
		[ 85, 5.33 ],
		[ 80, 5.52 ],
		[ 75, 5.70 ],
		[ 65, 5.89 ],
		[ 55, 6.07 ],
		[ 45, 6.26 ],
		[ 38, 6.44 ],
		[ 35, 6.63 ],
		[ 31, 6.81 ],
		[ 29, 7.00 ],
		[ 26, 7.18 ],
		[ 25, 7.37 ],
		[ 23, 7.55 ],
		[ 20, 7.74 ],
		[ 18, 7.92 ],
		[ 16, 8.11 ],
		[ 14, 8.29 ],
		[ 12, 8.48 ],
		[ 10, 8.66 ],
		[ 8, 8.85 ],
		[ 6, 9.03 ],
		[ 4, 9.22 ],
		[ 3, 9.40 ],
		[ 2, 10.0 ],
		[ 1, 10.5 ],
	],

	triglycerides: [
		[ 100, 0 ],
		[ 100, 10 ],
		[ 100, 20 ],
		[ 100, 30 ],
		[ 100, 40 ],
		[ 99, 50 ],
		[ 96, 60 ],
		[ 90, 70 ],
		[ 84, 80 ],
		[ 80, 90 ],
		[ 75, 100 ],
		[ 70, 110 ],
		[ 65, 120 ],
		[ 60, 130 ],
		[ 55, 140 ],
		[ 50, 150 ],
		[ 48, 160 ],
		[ 42, 170 ],
		[ 36, 180 ],
		[ 33, 190 ],
		[ 28, 200 ],
		[ 24, 210 ],
		[ 20, 220 ],
		[ 18, 230 ],
		[ 16, 240 ],
		[ 14, 250 ],
		[ 12, 260 ],
		[ 10, 270 ],
		[ 8, 280 ],
		[ 6, 290 ],
		[ 4, 300 ],
		[ 2, 310 ],
		[ 1, 320 ],
		[ 0, 330 ],
		[ 0, 340 ],
		[ 0, 350 ],
		[ 0, 360 ],
		[ 0, 370 ],
		[ 0, 380 ],
		[ 0, 390 ],
		[ 0, 400 ],
	],

	hdl: [
		[ 100, 0 ],
		[ 100, 3 ],
		[ 100, 5 ],
		[ 100, 8 ],
		[ 100, 10 ],
		[ 100, 13 ],
		[ 100, 15 ],
		[ 100, 18 ],
		[ 100, 20 ],
		[ 100, 23 ],
		[ 100, 25 ],
		[ 100, 28 ],
		[ 99, 30 ],
		[ 98, 33 ],
		[ 97, 35 ],
		[ 94, 38 ],
		[ 86, 40 ],
		[ 79, 43 ],
		[ 66, 45 ],
		[ 49, 48 ],
		[ 40, 50 ],
		[ 35, 53 ],
		[ 29, 55 ],
		[ 25, 58 ],
		[ 22, 60 ],
		[ 19, 63 ],
		[ 17, 65 ],
		[ 16, 68 ],
		[ 14, 70 ],
		[ 12, 73 ],
		[ 11, 75 ],
		[ 9, 78 ],
		[ 7, 80 ],
		[ 6, 83 ],
		[ 4, 85 ],
		[ 3, 88 ],
		[ 2, 90 ],
		[ 2, 93 ],
		[ 0, 95 ],
		[ 0, 98 ],
		[ 0, 100 ],
	],

	'waist.male': [
		[ 100, 30 ],
		[ 100, 31 ],
		[ 100, 31 ],
		[ 100, 32 ],
		[ 99, 32 ],
		[ 98, 33 ],
		[ 97, 33 ],
		[ 96, 34 ],
		[ 95, 34 ],
		[ 94, 35 ],
		[ 93, 35 ],
		[ 90, 36 ],
		[ 88, 36 ],
		[ 86, 37 ],
		[ 84, 37 ],
		[ 80, 38 ],
		[ 75, 38 ],
		[ 70, 39 ],
		[ 60, 39 ],
		[ 50, 40 ],
		[ 40, 40 ],
		[ 35, 41 ],
		[ 31, 41 ],
		[ 30, 42 ],
		[ 28, 42 ],
		[ 26, 43 ],
		[ 24, 43 ],
		[ 22, 44 ],
		[ 20, 44 ],
		[ 18, 45 ],
		[ 16, 45 ],
		[ 14, 46 ],
		[ 12, 46 ],
		[ 10, 47 ],
		[ 8, 47 ],
		[ 7, 48 ],
		[ 6, 48 ],
		[ 5, 49 ],
		[ 4, 49 ],
		[ 3, 50 ],
		[ 2, 50 ],
	],

	'waist.female': [
		[ 100, 25 ],
		[ 100, 26 ],
		[ 100, 26 ],
		[ 100, 27 ],
		[ 99, 27 ],
		[ 98, 28 ],
		[ 97, 28 ],
		[ 96, 29 ],
		[ 94, 29 ],
		[ 92, 30 ],
		[ 90, 30 ],
		[ 88, 31 ],
		[ 86, 31 ],
		[ 84, 32 ],
		[ 80, 32 ],
		[ 76, 33 ],
		[ 68, 33 ],
		[ 61, 34 ],
		[ 54, 34 ],
		[ 48, 35 ],
		[ 44, 35 ],
		[ 40, 36 ],
		[ 36, 36 ],
		[ 31, 37 ],
		[ 27, 37 ],
		[ 24, 38 ],
		[ 20, 38 ],
		[ 18, 39 ],
		[ 16, 39 ],
		[ 14, 40 ],
		[ 12, 40 ],
		[ 10, 41 ],
		[ 9, 41 ],
		[ 8, 42 ],
		[ 7, 42 ],
		[ 6, 43 ],
		[ 5, 43 ],
		[ 4, 44 ],
		[ 3, 44 ],
		[ 2, 45 ],
		[ 1, 45 ],
	],

	systolic: [
		[ 100, 90 ],
		[ 100, 95 ],
		[ 100, 100 ],
		[ 100, 105 ],
		[ 100, 110 ],
		[ 95, 115 ],
		[ 90, 120 ],
		[ 80, 125 ],
		[ 70, 130 ],
		[ 65, 135 ],
		[ 60, 140 ],
		[ 42, 145 ],
		[ 30, 150 ],
		[ 20, 155 ],
		[ 15, 160 ],
		[ 10, 165 ],
		[ 7, 170 ],
		[ 2, 175 ],
		[ 1, 180 ],
	],

	diastolic: [
		[ 100, 60 ],
		[ 100, 65 ],
		[ 95, 70 ],
		[ 90, 75 ],
		[ 85, 80 ],
		[ 40, 85 ],
		[ 30, 90 ],
		[ 22, 95 ],
		[ 15, 100 ],
		[ 10, 105 ],
		[ 7, 110 ],
		[ 4, 115 ],
		[ 2, 120 ],
		[ 0, 125 ],
		[ 0, 130 ],
	]
};

module.exports = healthscoreLookups;

},{}],2:[function(require,module,exports){

const healthscoreWeights = {
	a1c:           .5,
	triglycerides: .05,
	hdl:           .2,
	bloodPressure: .15,
	waist:         .1
};

module.exports = healthscoreWeights;

},{}],3:[function(require,module,exports){

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

},{"./healthscore-lookups":1,"./healthscore-weights":2,"./lookup-nearest":4}],4:[function(require,module,exports){

const nearest = require('./nearest');

function lookupNearest(lookups, name, value) {
	let lookup = lookups[name];

	if (!lookup) { return null; }

	const element = nearest(lookup, value, element => element[1]);

	if (!element) { return null; }

	return element[0];
}

module.exports = lookupNearest;

},{"./nearest":5}],5:[function(require,module,exports){

/**
 * Find the element of `array` with the value returned from `iteratee` nearest to `value`.
 * When multiple elements are equidistant from the target value, returns the element with the
 * lowest array index.
 *
 * @param {Array} array The array to inspect.
 * @param {*} value The target value.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {*} Returns the matching array element.
 */
function nearest(array, value, iteratee) {
	return array.reduce((previous, current) => {
		return Math.abs(iteratee(current) - value) < Math.abs(iteratee(previous) - value) ? current : previous;
	});
}

module.exports = nearest;

},{}]},{},[3])(3)
});
