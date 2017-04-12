
const async = require('async');
const config = require('config');
const mongodb = require('mongodb');

const generateUser = require ('./generate-user');
const generateBiodata = require('./generate-biodata');

const count = config.get('count');
const connectionString = config.get('mongodb.connectionString');

mongodb.MongoClient.connect(connectionString, (err, db) => {
	if (err) { return console.error(err); }

	async.timesSeries(count, (index, callback) => {
		const user = generateUser();

		user._id = new mongodb.ObjectID();

		const biodata = generateBiodata();

		user.gender = biodata._gender;
		user.created = biodata._start;
		user.modified = biodata._end;
		user._healthscore = biodata._healthscore;
		user._trajectory = biodata._trajectory;

		//console.log(user);
		process.stdout.write('*');

		db.collection('users').insertOne(user, err => {
			if (err) { return console.error(err); }

			async.eachSeries(biodata.dataset, (data, callback) => {
				const doc = {
					_id: new mongodb.ObjectID(),
					userID: user._id,
					type: data.type,
					data: data.data,
					created: biodata._start,
					modified: biodata._end,
					_demo: true
				};

				//console.log(doc);
				process.stdout.write('.');

				db.collection('biodata').insertOne(doc, callback);
			}, callback);
		});
	}, (err, results) => {
		if (err) { return console.error(err); }

		db.close();

		console.log();
	});
});
