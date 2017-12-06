var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  access_token: String,
  tag: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: Date,
});

module.exports = schema;
module.exports.modelName = 'AuditTrail';
