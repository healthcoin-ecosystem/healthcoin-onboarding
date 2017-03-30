
import feathers from 'feathers-client';

let authenticated = false;

const app = feathers();

app.configure(feathers.rest().fetch(fetch));
app.configure(feathers.hooks());
app.configure(feathers.authentication({ storage: window.localStorage }));

export function init(callback = null) {
	return authenticate(null, callback);
}

export function login(email, password, callback = null) {
	return authenticate({ type: 'local', email, password }, callback);
}

export function isAuthenticated() {
	return authenticated;
}

export function logout(callback = null) {
	app.logout();
	authenticated = false;
	if (callback) { callback(); }
}

function authenticate(options, callback = null) {
	const auth = options ? app.authenticate(options) : app.authenticate();

	return auth.then(result => {
		authenticated = true;
		if (callback) { callback(); }
	}).catch(err => {
		authenticated = false;
		if (callback) { callback(err); }
	});
}
