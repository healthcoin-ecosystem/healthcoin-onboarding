
var app = feathers();

app.configure(feathers.rest().jquery(jQuery));
app.configure(feathers.hooks());
app.configure(feathers.authentication({ storage: window.localStorage }));

$(function () {
	app.authenticate().then(function (result) {

		console.log(result);

		var token = app.get('token');

		$('form').attr('action', '/images?token=' + token);

	}).catch(function (err) {
		if (err.name == 'NotAuthenticated' || err.name == 'NotFound') {
			window.location = '/login';
			return;
		}

		console.error(err);
	});
});
