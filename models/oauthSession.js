var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  accessToken: String,
  clientId: String,
  code: String,
  redirectUrl: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  scopes: [String],
  expiry: Date,
});

module.exports = schema;
module.exports.modelName = 'OAuthSession';
