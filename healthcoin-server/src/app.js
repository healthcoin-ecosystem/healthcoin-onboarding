
const path = require('path');

const config = require('config');
const favicon = require('serve-favicon');
const compression = require('compression');
const feathers = require('feathers');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const middleware = require('./middleware');
const services = require('./services');

const app = feathers();

app.use(compression());
app.use(morgan('dev'));
app.use(favicon(path.join(__dirname, config.get('public'), 'favicon.ico')));
app.use('/', feathers.static(path.join(__dirname, config.get('public'))));
app.use('/', feathers.static(path.join(__dirname, '../node_modules/feathers-client/dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.configure(hooks());
app.configure(rest());
app.configure(services);
app.use('/*', feathers.static(path.join(__dirname, config.get('public'), 'index.html')));
app.configure(middleware);

module.exports = app;
