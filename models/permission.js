const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  description: String,
  isPaidFor: Boolean,
  scope: String,
});

module.exports = schema;
module.exports.modelName = 'Permission';
