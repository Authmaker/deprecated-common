var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  // parameters
  expiryDate: Date,
  name: String,
  stripeId: String,

  // associations
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plan',
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  admins: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
});

module.exports = schema;
module.exports.modelName = 'Account';
