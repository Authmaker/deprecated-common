const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  stripePlan: {
    type: String,
    ref: 'stripe-plan',
  },
  allowSubscriptions: Boolean,

  // references
  permissions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Permission',
  }],
});

module.exports = schema;
module.exports.modelName = 'Plan';
