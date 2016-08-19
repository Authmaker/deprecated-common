var mongoose = require('mongoose');
var _ = require('lodash');
var Q = require('q');

var schema = new mongoose.Schema({

  // User key - unique
  email: String, // username
  clientId: String,

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

}, {
  discriminatorKey: 'kind',
});

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
schema.methods.getAccounts = function() {
  return this.model('Account').find({
    users: this._id,
  });
};

schema.methods.getActivePlans = function() {
  return this.getAccounts().then(function(accounts) {
    var activeAccounts = _.chain(accounts)
      .filter(function(account) {
        return account.expiryDate > new Date();
      })
      .compact()
      .value();

    var promises = activeAccounts.map(function(account) {
      return account.populate('plan').execPopulate();
    });

    return Q.all(promises).then(function(populatedAccounts) {
      return _.chain(populatedAccounts)
        .map('plan')
        .compact()
        .uniq()
        .value();
    });
  });
};

schema.methods.getActivePermissions = function() {
  return this.getActivePlans().then(function(plans) {
    var promises = plans.map(function(plan) {
      return plan.populate('permissions').execPopulate();
    });

    return Q.all(promises).then(function(populatedPlans) {
      return _.chain(populatedPlans)
        .map('permissions')
        .flatten()
        .uniq()
        .compact()
        .value();
    });
  });
};

schema.methods.getActivePermissionScopes = function() {
  return this.getActivePermissions().then(function(permissions) {
    return _.map(permissions, 'scope');
  });
};

module.exports = schema;
module.exports.modelName = 'User';
