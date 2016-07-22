var mongoose = require('mongoose');
var mongooseConnect = require('mongoose-nconf-connect');
var Q = require('q');
var winston = require('winston');
var fs = require('fs');
var path = require('path');

var mongoConnection;
var deferredConnections = [];
var models = {};

function loadMongooseModels(connection) {
  fs.readdirSync(path.join(__dirname, '..', 'models'))
    .filter(function(file) {
      return file.indexOf('.') !== 0 && file !== 'index.js';
    })
    .forEach(function(file) {
      var requireFilename = file.replace('.js', '');

      // eslint-disable-next-line global-require
      var model = require(path.join('..', 'models', requireFilename));
      models[requireFilename] = connection.model(model.modelName, model);
    });
}

function initMongo(nconf) {
  if (!nconf.get('authmaker:mongo')) {
    throw new Error('NConf entry for authmaker:mongo: requried to run this application');
  }

  return mongooseConnect.connectNewMongo(nconf, mongoose, {
    configPrefix: 'authmaker:mongo:',
    logger: winston,
  }).then(function (connection) {
    mongoConnection = connection;

    loadMongooseModels(connection);

    deferredConnections.forEach(function (deferredConnection) {
      deferredConnection.resolve(connection);
    });
  });
}

function getCommonMongoConnection() {
  // connection not made already so defer the promise and resolve them later
  var deferredConnection = Q.defer();

  // we've already connected so return instantly
  if (mongoConnection) {
    return Q(mongoConnection);
  }

  deferredConnections.push(deferredConnection);

  return deferredConnection.promise;
}

module.exports = {
  init: initMongo,
  getConnection: getCommonMongoConnection,
  models: models,
};
