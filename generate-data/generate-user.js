
const faker = require('faker');

function generateUser() {
	const gender = faker.random.number(1);
	const firstname = faker.name.firstName(gender);
	const lastname = faker.name.lastName();

	const now = new Date();

	return {
		email: faker.internet.exampleEmail(firstname, lastname),
		//password: faker.internet.password(faker.random.number({ min: 12, max: 16 })),
		password: '$2a$10$TSS4ErE2nmuEfNXu.UrA6eBf0HiPhZhk5IegVhazrhOu6QwMZ46ee', // hash of 000000
		firstname,
		lastname,
		gender: [ 'male', 'female' ][gender],
		birthdate: faker.date.between('1937-01-01', '1999-01-01'),
		created: now,
		modified: now,
		deleted: false,
		_demo: true
	}
}

function generateAdmin() {
	const gender = faker.random.number(1);
	const firstname = faker.name.firstName(gender);
	const lastname = faker.name.lastName();

	const now = new Date();

	return {
		email: 'admin@healthcoin.com',
		password: '$2a$10$TSS4ErE2nmuEfNXu.UrA6eBf0HiPhZhk5IegVhazrhOu6QwMZ46ee', // hash of 000000
		firstname,
		lastname,
		gender: [ 'male', 'female' ][gender],
		birthdate: faker.date.between('1937-01-01', '1999-01-01'),
		created: now,
		modified: now,
		roles: ['admin'],
		deleted: false,
		_demo: true
	}
}

module.exports = {
	generateUser,
	generateAdmin
}
