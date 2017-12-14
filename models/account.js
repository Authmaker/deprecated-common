const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  // parameters
  expiry: Date,
  name: String,
  stripeId: String,

  metaData: mongoose.Schema.Types.Mixed,

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
