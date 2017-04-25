'use strict';

const assert = require('assert');
const app = require('../../src/app');
const mongoose = require('mongoose');

const user = { _id: new mongoose.mongo.ObjectID('58f82a866c5545ccec5f2646') };

describe('biodata service', function () {
	it('registered the biodata service', () => {
		assert.ok(app.service('biodata'));
	});

	it('generates demo biodata', done => {
		app.service('biodata').create({ demo: true }, { user: user }, (err, result) => {
			if (err) { return done(err); }

			done();
		});
	});

	it('returns aggregated data for a cohort', done => {
		app.service('biodata').find({ user: user, query: { cohort: true } }, (err, result) => {
			if (err) { return done(err); }

			done();
		});
	});
});




const moment = require('moment');
const interpolate = require('everpolate');

const data = [{
	date: new Date('2010-01-01'),
	value: 1
}, {
	date: new Date('2012-01-01'),
	value: 2
}, {
	date: new Date('2014-01-01'),
	value: 3
}];



// for the interval dates between the data start and end dates
// interpolate using interval
// for the interval dates between start and end
// aggregate using interpolated dates

function doit(start, end, interval) {
	const dates = getDatesForInterval(start, end, interval);
	console.log(dates);

const interpolated = interpolate.linear(dates.map(date => date.getTime()), data.map(d => d.date.getTime()), data.map(d => d.value));

console.log(interpolated);
}

function getDatesForInterval(start, end, interval) {
	start = moment(start);
	end = moment(end);
	const dates = [];

	let index = start.startOf(interval).add(1, interval);

	while (end.isSameOrAfter(index)) {
		dates.push(index.toDate())
		index.startOf(interval).add(1, interval);
	}

	return dates;
}

// it('does this', function () {
// 	const interval = 'month';
// 	const start = new Date('2011-01-01');
// 	const end = new Date('2013-01-01');
// 	doit(start, end, interval);
// });
