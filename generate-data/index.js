const async = require('async');
const config = require('config');
const mongodb = require('mongodb');

const random = require('./random');
const generateUser = require('./generate-user');
const generateBiodata = require('./generate-biodata');

const count = config.get('count');
const connectionString = config.get('mongodb.connectionString');

/*
function createAdminUser(db, callback) {
	db.collection('users').find({email: 'admin@healthcoin.com'}).toArray((err, doc) => {
		if(!err) {
			if(!doc.length) {
				const admin  = userlib.generateAdmin();
				admin._id = new mongodb.ObjectID();

				db.collection('users').insertOne(admin, (err, res) => {
					callback(err, res.insertedId);
				});
			}
			else {
				callback(err, doc[0]._id);
			}
		}
		else {
			callback(err, {});
		}
	});
}

function createDefaultGroup(db, callback) {
	const now = new Date();

	db.collection('groups').find({name: 'Group 1'}).toArray((err, doc) => {
		if(!err) {
			if(!doc.length) {
				const defaultGroup  = {
					name: 'Group 1',
					created: now,
					modified: now,
					deleted: false,
					_demo: true
				}
				defaultGroup._id = new mongodb.ObjectID();

				db.collection('groups').insertOne(defaultGroup, (err, res) => {
					callback(err, res.insertedId);
				});
			}
			else {
				callback(err, doc[0]._id);
			}
		}
		else {
			callback(err, {});
		}
	});
}

function createUserMarkers(db, userId, callback) {
	let data = [];
	const from = '2017-01-01';
	const now = new Date();

	for(let i = 0; i < random.integer(2, 8); i++) {
		data.push({
			_id: new mongodb.ObjectID(),
			date: random.date(from, now),
			value: random.integer(3, 6)
		});
	}
	const a1c = {
	    "userID" : userId,
	    "type" : "A1C",
	    "data" : data,
	    "created" : now,
	    "modified" : now,
	    "deleted" : false,
		"_demo": true
	};

	data = [];
	for(let i = 0; i < random.integer(2, 8); i++) {
		data.push({
			_id: new mongodb.ObjectID(),
			date: random.date(from, now),
			value: random.integer(110, 200)
		});
	}
	const trigylcerides = {
	    "userID" : userId,
	    "type" : "Trigylcerides",
	    "data" : data,
	    "created" : now,
	    "modified" : now,
	    "deleted" : false,
		"_demo": true
	};

	data = [];
	for(let i = 0; i < random.integer(2, 8); i++) {
		data.push({
			_id: new mongodb.ObjectID(),
			date: random.date(from, now),
			value: random.integer(40, 190)
		});
	}
	const hdl = {
	    "userID" : userId,
	    "type" : "HDL",
	    "data" : data,
	    "created" : now,
	    "modified" : now,
	    "deleted" : false,
		"_demo": true
	};

	data = [];
	for(let i = 0; i < random.integer(2, 8); i++) {
		data.push({
			_id: new mongodb.ObjectID(),
			date: random.date(from, now),
			value: random.integer(25, 50)
		});
	}
	const waistSize = {
	    "userID" : userId,
	    "type" : "Waist Size",
	    "data" : data,
	    "created" : now,
	    "modified" : now,
	    "deleted" : false,
		"_demo": true
	};

	data = [];
	for(let i = 0; i < random.integer(2, 8); i++) {
		data.push({
			_id: new mongodb.ObjectID(),
			date: random.date(from, now),
			value: random.integer(100, 190) + '/' + random.integer(70, 150)
		});
	}
	const bloodPressure = {
	    "userID" : userId,
	    "type" : "Blood Pressure",
	    "data" : data,
	    "created" : now,
	    "modified" : now,
	    "deleted" : false,
		"_demo": true
	};

	db.collection('biodata').insertOne(a1c, (err, res) => {
		if(!err) {
			db.collection('biodata').insertOne(trigylcerides, (err, res) => {
				if(!err) {
					db.collection('biodata').insertOne(hdl, (err, res) => {
						if(!err) {
							db.collection('biodata').insertOne(waistSize, (err, res) => {
								if(!err) {
									db.collection('biodata').insertOne(bloodPressure, callback);
								}
								else {
									callback(err, {});
								}
							});
						}
						else {
							callback(err, {});
						}
					});
				}
				else {
					callback(err, {});
				}
			});
		}
		else {
			callback(err, {});
		}
	});
}

mongodb.MongoClient.connect(connectionString, (err, db) => {
	if (err) {
		return console.error(err);
	}
	// create admin user if it doesn't yet exist
	createAdminUser(db, (err, adminId) => {
		if(!err) {
			// create default group if it doesn't yet exist
			createDefaultGroup(db, (err, groupId) => {
				if(!err) {
					const user = userlib.generateUser();
					user._id = new mongodb.ObjectID();

					// assign to the default group
					user.group = groupId;
					user.roles = [];

					//create user
					db.collection('users').insertOne(user, err => {
						if (!err) {
							console.log(user.email);

							// generate user markers
							createUserMarkers(db, user._id, (err, res) => {
								db.close();
							});
						}
					});
				}
			});
		}
*/

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
