
const faker = require('faker');

// Generates a user
function generateUser() {
	const gender = faker.random.number(1);
	const firstname = faker.name.firstName(gender);
	const lastname = faker.name.lastName();

	const now = new Date();

	return {
		email: faker.internet.exampleEmail(firstname, lastname),
		//password: faker.internet.password(faker.random.number({ min: 12, max: 16 })),
		// hash of 000000
		// TODO: use a more secure default password
		password: '$2a$10$TSS4ErE2nmuEfNXu.UrA6eBf0HiPhZhk5IegVhazrhOu6QwMZ46ee',
		firstname,
		lastname,
		gender: [ 'male', 'female' ][gender],
		birthdate: faker.date.between('1937-01-01', '1999-01-01'),
		group: null,
		roles: [],
		created: now,
		modified: now,
		deleted: false,
		_demo: true
	}
}

module.exports = generateUser;
