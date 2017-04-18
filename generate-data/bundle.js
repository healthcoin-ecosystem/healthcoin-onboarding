(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

const generateBiodata = require('./generate-biodata');

const config = {
	default: {
		layout: {
			margin: {
				l: 60,
				r: 30,
				b: 60,
				t: 30
			},
			xaxis: {
				range: [ new Date('2009-01-01').getTime(), Date.now() ]
			}
		}
	},
	'a1c': {
		trace: {
			line: {
				shape: 'spline',
				color: 'red'
			}
		},
		layout: {
			yaxis: {
				range: [ 2, 10.5 ]
			}
		}
	},
	'waist': {
		trace: {
			line: {
				shape: 'spline',
				color: 'green'
			}
		},
		layout: {
			yaxis: {
				range: [ 25, 50 ]
			}
		}
	},
	'systolic': {
		trace: {
			line: {
				shape: 'spline',
				color: 'blue'
			}
		},
		layout: {
			yaxis: {
				range: [ 60, 130 ]
			}
		}
	},
	'diastolic': {
		trace: {
			line: {
				shape: 'spline',
				color: 'orange'
			}
		},
		layout: {
			yaxis: {
				range: [ 90, 180 ]
			}
		}
	},
	'hdl': {
		trace: {
			line: {
				shape: 'spline',
				color: 'violet'
			}
		},
		layout: {
			yaxis: {
				range: [ 0, 100 ]
			}
		}
	},
	'triglycerides': {
		trace: {
			line: {
				shape: 'spline',
				color: 'purple'
			}
		},
		layout: {
			yaxis: {
				range: [ 0, 400 ]
			}
		}
	}
}

function generate() {
	const plots = document.getElementById('plots');
	plots.innerHTML = '';

	const biodata = generateBiodata();

	const traces = biodata.dataset.map(
		data => trace(data.type, data.data.map(
			({ date, value }) => ({ x: date, y: value })
		))
	);

	traces.forEach(trace => {
		const element = document.createElement('div');
		element.style.display = 'inline-block';
		element.style.width = '400px';
		element.style.height = '300px';
		plots.appendChild(element);

		const layout = Object.assign({
			title: trace.name
		}, config.default.layout, (config[trace.name] || {}).layout || {});

		Plotly.newPlot(element, [ trace ], layout);
	});

	document.getElementById('data').innerText = JSON.stringify(biodata, null, '   ');

	document.getElementById('heading').innerHTML = biodata._gender + ', score: ' + biodata._healthscore + ', trajectory: <span style="color: ' + (trajectoryColors[biodata._trajectory] || '') + ';">' + biodata._trajectory + '</span>';
}

const trajectoryColors = {
	increase: 'red',
	decrease: 'green'
};

function trace(name, data) {
	return Object.assign({
		x: data.map(d => d.x),
		y: data.map(d => d.y),
		name,
		type: 'scatter',
		line: {
			shape: 'spline'
		},
	}, (config[name] || {}).trace || {});
}

generate();

window.generate = generate;

},{"./generate-biodata":2}],2:[function(require,module,exports){

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
		_start: start,
		_end: end,
		_healthscore: healthscore,
		_trajectory: trajectory,
		_gender: gender,
		_demo: true,
		dataset,
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
				// Using the healthscore and trajectory line, determine healthscore addend for date
				const addend = getAddendForTrajectoryAtDate(trajectory, timeline, date);
				const adjustedHealthscore = healthscore + addend;

				let healthscoreModel = model.healthscore[type];

				if (!healthscoreModel) { return; }

				if (healthscoreModel.male && healthscoreModel.female) {
					healthscoreModel = healthscoreModel[gender];
				}

				// look up marker value from model using nearest healthscore
				let value = healthscoreModel.reduce(
					(prev, curr) => {
						return (Math.abs(curr[0] - adjustedHealthscore) < Math.abs(prev[0] - adjustedHealthscore)) ? curr : prev;
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

function getAddendForTrajectoryAtDate(trajectory, timeline, date) {
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

},{"./model":3,"./random":5,"gaussian":4}],3:[function(require,module,exports){

module.exports = {

	dates: {
		startRange: [ '2009-01-01', '2012-01-01' ],
		endRange: [ '2017-03-01', '2017-04-01' ]
	},

	// Minimum and maximum days between biodata samples
	intervals: {
		'a1c': {
			min: 182,
			max: 547
		},
		'waist': {
			min: 90,
			max: 365
		},
		'systolic,diastolic': {
			min: 60,
			max: 400
		},
		'hdl,triglycerides': {
			min: 300,
			max: 900
		}
	},

	trajectories: {
		increase: {
			weight: .05,
			lines: [
				// [ [ <days since last sample>, <healthscore addend> ] ]
				[ [ -3650, 0 ], [ -365, 0 ], [ 0, -10 ] ],
				[ [ -3650, 10 ], [ -365, 0 ], [ 0, -10 ] ],
				[ [ -3650, -10 ], [ -365, 0 ], [ 0, -10 ] ]
			]
		},
		decrease: {
			weight: .6,
			lines: [
				[ [ -3650, 0 ], [ -365, 0 ], [ 0, 10 ] ],
				[ [ -3650, 10 ], [ -365, 0 ], [ 0, 10 ] ],
				[ [ -3650, -10 ], [ -365, 0 ], [ 0, 10 ] ]
			]
		},
		stable: {
			weight: .2,
			lines: [
				[ [ -3650, 0 ], [ -365, 0 ], [ 0, 0 ] ],
				[ [ -3650, 10 ], [ -365, 0 ], [ 0, 0 ] ],
				[ [ -3650, -10 ], [ -365, 0 ], [ 0, 0 ] ]
			]
		},
		random: {
			weight: .15,
			lines: [
				[ [ -3650, 10 ], [ -365, 0 ], [ -284, 5 ], [ -182, -5 ], [ -92, 0 ] ],
				[ [ -3650, -10 ], [ -365, 0 ], [ -284, -5 ], [ -182, 5 ], [ -92, 0 ] ]
			]
		}
	},

	healthscore: {
		distribution: {
			mean: 35,
			variance: .1
		},

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

		waist: {

			male: [
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

			female: [
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
			]
		},

		diastolic: [
			// [ 100, 90 ],
			// [ 100, 95 ],
			// [ 100, 100 ],
			// [ 100, 105 ],
			// [ 100, 110 ],
			// [ 95, 115 ],
			// [ 90, 120 ],
			// [ 80, 125 ],
			// [ 70, 130 ],
			// [ 65, 135 ],
			// [ 60, 140 ],
			// [ 42, 145 ],
			// [ 30, 150 ],
			// [ 20, 155 ],
			// [ 15, 160 ],
			// [ 10, 165 ],
			// [ 7, 170 ],
			// [ 2, 175 ],
			// [ 1, 180 ],
			[ 79, 110 ],
			[ 73, 115 ],
			[ 67, 120 ],
			[ 56, 125 ],
			[ 46, 130 ],
			[ 41, 135 ],
			[ 37, 140 ],
			[ 23, 145 ],
			[ 15, 150 ],
			[ 9, 155 ],
			[ 6, 160 ],
			[ 4, 165 ],
			[ 3, 170 ],
			[ 1, 175 ],
			[ 0, 180 ],
		],

		systolic: [
			// [ 100, 60 ],
			// [ 100, 65 ],
			// [ 95, 70 ],
			// [ 90, 75 ],
			// [ 85, 80 ],
			// [ 40, 85 ],
			// [ 30, 90 ],
			// [ 22, 95 ],
			// [ 15, 100 ],
			// [ 10, 105 ],
			// [ 7, 110 ],
			// [ 4, 115 ],
			// [ 2, 120 ],
			// [ 0, 125 ],
			// [ 0, 130 ],
			[ 100, 77 ],
			[ 95, 78 ],
			[ 90, 79 ],
			[ 85, 80 ],
			[ 40, 81 ],
			[ 30, 82 ],
			[ 22, 83 ],
			[ 15, 84 ],
			[ 10, 85 ],
			[ 7, 86 ],
			[ 4, 87 ],
			[ 2, 88 ],
			[ 0, 89 ],
		]

	}
};

},{}],4:[function(require,module,exports){
(function(exports) {

  // Complementary error function
  // From Numerical Recipes in C 2e p221
  var erfc = function(x) {
    var z = Math.abs(x);
    var t = 1 / (1 + z / 2);
    var r = t * Math.exp(-z * z - 1.26551223 + t * (1.00002368 +
            t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 +
            t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 +
            t * (-0.82215223 + t * 0.17087277)))))))))
    return x >= 0 ? r : 2 - r;
  };

  // Inverse complementary error function
  // From Numerical Recipes 3e p265
  var ierfc = function(x) {
    if (x >= 2) { return -100; }
    if (x <= 0) { return 100; }

    var xx = (x < 1) ? x : 2 - x;
    var t = Math.sqrt(-2 * Math.log(xx / 2));

    var r = -0.70711 * ((2.30753 + t * 0.27061) /
            (1 + t * (0.99229 + t * 0.04481)) - t);

    for (var j = 0; j < 2; j++) {
      var err = erfc(r) - xx;
      r += err / (1.12837916709551257 * Math.exp(-(r * r)) - r * err);
    }

    return (x < 1) ? r : -r;
  };

  // Models the normal distribution
  var Gaussian = function(mean, variance) {
    if (variance <= 0) {
      throw new Error('Variance must be > 0 (but was ' + variance + ')');
    }
    this.mean = mean;
    this.variance = variance;
    this.standardDeviation = Math.sqrt(variance);
  }

  // Probability density function
  Gaussian.prototype.pdf = function(x) {
    var m = this.standardDeviation * Math.sqrt(2 * Math.PI);
    var e = Math.exp(-Math.pow(x - this.mean, 2) / (2 * this.variance));
    return e / m;
  };

  // Cumulative density function
  Gaussian.prototype.cdf = function(x) {
    return 0.5 * erfc(-(x - this.mean) / (this.standardDeviation * Math.sqrt(2)));
  };

  // Percent point function
  Gaussian.prototype.ppf = function(x) {
    return this.mean - this.standardDeviation * Math.sqrt(2) * ierfc(2 * x);
  };

  // Product distribution of this and d (scale for constant)
  Gaussian.prototype.mul = function(d) {
    if (typeof(d) === "number") {
      return this.scale(d);
    }
    var precision = 1 / this.variance;
    var dprecision = 1 / d.variance;
    return fromPrecisionMean(
        precision + dprecision, 
        precision * this.mean + dprecision * d.mean);
  };

  // Quotient distribution of this and d (scale for constant)
  Gaussian.prototype.div = function(d) {
    if (typeof(d) === "number") {
      return this.scale(1 / d);
    }
    var precision = 1 / this.variance;
    var dprecision = 1 / d.variance;
    return fromPrecisionMean(
        precision - dprecision, 
        precision * this.mean - dprecision * d.mean);
  };

  // Addition of this and d
  Gaussian.prototype.add = function(d) {
    return gaussian(this.mean + d.mean, this.variance + d.variance);
  };

  // Subtraction of this and d
  Gaussian.prototype.sub = function(d) {
    return gaussian(this.mean - d.mean, this.variance + d.variance);
  };

  // Scale this by constant c
  Gaussian.prototype.scale = function(c) {
    return gaussian(this.mean * c, this.variance * c * c);
  };

  var gaussian = function(mean, variance) {
    return new Gaussian(mean, variance);
  };

  var fromPrecisionMean = function(precision, precisionmean) {
    return gaussian(precisionmean / precision, 1 / precision);
  };

  exports(gaussian);
})
(typeof(exports) !== "undefined"
    ? function(e) { module.exports = e; }
    : function(e) { this["gaussian"] = e; });

},{}],5:[function(require,module,exports){

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

},{}]},{},[1]);
