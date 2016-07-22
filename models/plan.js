var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: String,
  stripePlan: String,
  allowSubscriptions: Boolean,

  // references
  permissions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Permission',
  }],
});

module.exports = schema;
module.exports.modelName = 'Plan';
