const app = require('./app');

const port = app.get('port');

const server = app.listen(port);

server.on('listening', () => {
	console.log(`Healthcoin Server started on ${app.get('host')}:${port}`);

	app._router.stack.forEach(function(r){
		if (r.route && r.route.path){
			console.log(r.route.path)
		}
	})

});
