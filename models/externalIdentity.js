var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  externalId: String,
  username: String,
  displayName: String,
  provider: String,
  authTokens: mongoose.Schema.Types.Mixed,
  rawProfile: mongoose.Schema.Types.Mixed,
});

module.exports = schema;
module.exports.modelName = 'ExternalIdentity';
