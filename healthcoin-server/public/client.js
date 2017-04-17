
var app = feathers();

app.configure(feathers.rest().jquery(jQuery));
app.configure(feathers.hooks());
app.configure(feathers.authentication({ storage: window.localStorage }));

var userService = app.service('users');

$(function () {
	app.authenticate().then(function (result) {

		console.log(result);

		userService.find().then(function (page) {
			var users = page.data;

			$('#users').html(JSON.stringify(users, null, '   '));
		});

	}).catch(function (err) {
		if (err.name == 'NotAuthenticated' || err.name == 'NotFound') {
			window.location = '/login.html';
			return;
		}

		console.error(err);
	});
});
