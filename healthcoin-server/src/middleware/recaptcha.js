
const config = require('config');
const recaptcha = require('express-recaptcha');

recaptcha.init(config.get('recaptcha.site'), config.get('recaptcha.secret'));

module.exports = recaptcha;
