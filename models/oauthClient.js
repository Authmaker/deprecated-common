const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  clientId: String,
  clientSecret: String,
  redirectUrl: String,
  autoApprove: String,
});

module.exports = schema;
module.exports.modelName = 'OAuthClient';
