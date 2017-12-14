const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  accessToken: String,
  tag: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: Date,
});

module.exports = schema;
module.exports.modelName = 'AuditTrail';
