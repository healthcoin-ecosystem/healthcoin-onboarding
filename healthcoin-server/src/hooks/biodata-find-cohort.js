
const lodash = require('lodash');
const moment = require('moment');
const everpolate = require('everpolate');

function findCohort(hook, next) {
	const { user, query } = hook.params;

	if (query.cohort != 'true' && query.cohort !== true) {
		return next();
	}

	delete query.cohort;
	delete query.userID;

	hook.app.service('users').find({ query: { group: user.group, $limit: null } }, (err, result) => {
		if (err) { return next(err); }

		const userIDs = result.data.map(user => user._id);

		query.userID = { $in: userIDs };
		query.$limit = null;

		hook.app.service('biodata').find({ query }, (err, result) => {
			if (err) { return next(err); }

			const aggregatedBiodata = aggregateBiodata(result.data, 'year');

			hook.result = {
				total: aggregatedBiodata.length,
				limit: null,
				skip: 0,
				data: aggregatedBiodata
			};

			next();
		});
	});
}

function aggregateBiodata(biodata, interval) {
	const interpolatedBiodata = lodash.map(biodata, biodata => ({
		type: biodata.type,
		data: interpolate(biodata.data, interval)
	}));

	const interpolatedBiodataByType = lodash.groupBy(interpolatedBiodata, biodata => biodata.type);

	const aggregatedBiodata = lodash.map(interpolatedBiodataByType, (interpolatedBiodataOfType, key) => {
		const flatData = lodash.flatMap(interpolatedBiodataOfType, biodata => biodata.data);
		const interpolatedBiodataByDate = lodash.groupBy(flatData, data => data.date.getTime().toString());
		const data = lodash.map(interpolatedBiodataByDate, (interpolatedBiodataOfDate, date) => ({ date: new Date(parseInt(date)), value: lodash.meanBy(interpolatedBiodataOfDate, data => data.value)}));
		return { type: key, data: data };
	});

	return aggregatedBiodata;
}

function interpolate(data, interval) {
	if (data.length == 0) { return []; }

	data = lodash.sortBy(data, data => data.date.getTime());
	const start = lodash.first(data).date;
	const end = lodash.last(data).date;
	const dates = getDatesForInterval(start, end, interval);

	const interpolated = everpolate.linear(dates.map(date => date.getTime()), data.map(d => d.date.getTime()), data.map(d => d.value));

	return dates.map((date, index) => ({ date: date, value: interpolated[index] }));
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

module.exports = () => findCohort;
