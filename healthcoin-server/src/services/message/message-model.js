// message-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const messageSchema = require('../../schemas/message');
const messageModel = mongoose.model('message', messageSchema);

module.exports = messageModel;
