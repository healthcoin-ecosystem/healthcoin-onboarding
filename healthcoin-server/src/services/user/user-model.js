// user-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const userSchema = require('../../schemas/user');
const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
