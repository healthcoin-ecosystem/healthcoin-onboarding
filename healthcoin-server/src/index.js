
const config = require('./config');
const app = require('./app');

const host = config.get('host');
const port = config.get('port');

const server = app.listen(port);

server.on('listening', () => {
	console.log(`Healthcoin Server started on ${host}:${port}`);
});
