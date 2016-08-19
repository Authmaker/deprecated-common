var mongoose = require('mongoose');

var mongo = require('./lib/mongodb');

module.exports = {
  init: mongo.init,
  models: mongo.models,
  getConnection: mongo.getConnection,
  mongoose: mongoose,
};
