const mongoose = require('mongoose');
const _ = require('lodash');
const Q = require('q');

const schema = new mongoose.Schema({
  // User key - unique
  email: String, // username
  clientId: {
    type: String,
    ref: 'OauthClient',
  },

  // user fields
  displayName: String,
  password: String,
  termsAccepted: Boolean,
  isAuthmakerAdmin: Boolean,

  activated: Boolean,
  passwordResetHash: String,
  activationHash: String,

  sentEmails: [{
    message: String,
    reference: String,
    subject: String,
    timestamp: Date,
    to: String,
  }],

  metaData: mongoose.Schema.Types.Mixed,

  // refernces
  externalIdentities: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ExternalIdentity',
  }],

}, { usePushEach: true });

// create indexes
schema.index({
  email: 1,
});

schema.index({
  email: 1,
  clientId: 1,
}, {
  unique: true,
});

// schema methods
schema.methods.getAccounts = function getAccounts() {
  return this.model('Account').find({
    users: this._id,
  });
};

schema.methods.getActivePlans = function getActivePlans() {
  return this.getAccounts().then((accounts) => {
    const activeAccounts = _.chain(accounts)
      .filter(account => account.expiry > new Date())
      .compact()
      .value();

    const promises = activeAccounts.map(account => account.populate('plan').execPopulate());

    return Q.all(promises).then(populatedAccounts => _.chain(populatedAccounts)
      .map('plan')
      .compact()
      .uniq()
      .value());
  });
};

schema.methods.getActivePermissions = function getActivePermissions() {
  return this.getActivePlans().then((plans) => {
    const promises = plans.map(plan => plan.populate('permissions').execPopulate());

    return Q.all(promises).then(populatedPlans => _.chain(populatedPlans)
      .map('permissions')
      .flatten()
      .uniq()
      .compact()
      .value());
  });
};

schema.methods.getActivePermissionScopes = function getActivePermissionScopes() {
  return this.getActivePermissions().then(permissions => _.map(permissions, 'scope'));
};

module.exports = schema;
module.exports.modelName = 'User';
