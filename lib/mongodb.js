const mongoose = require('mongoose');
const mongooseConnect = require('mongoose-nconf-connect');
const Q = require('q');
const winston = require('winston');
const fs = require('fs');
const path = require('path');

let mongoConnection;
const deferredConnections = [];
const models = {};

function loadMongooseModels(connection) {
  fs.readdirSync(path.join(__dirname, '..', 'models'))
    .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
    .forEach((file) => {
      const requireFilename = file.replace('.js', '');

      // eslint-disable-next-line global-require
      const model = require(path.join('..', 'models', requireFilename));
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
  }).then((connection) => {
    mongoConnection = connection;

    loadMongooseModels(connection);

    deferredConnections.forEach((deferredConnection) => {
      deferredConnection.resolve(connection);
    });
  });
}

function getCommonMongoConnection() {
  // we've already connected so return instantly
  if (mongoConnection) {
    return Q(mongoConnection);
  }

  // connection not made already so defer the promise and resolve them later
  const deferredConnection = Q.defer();

  deferredConnections.push(deferredConnection);

  return deferredConnection.promise;
}

module.exports = {
  init: initMongo,
  getConnection: getCommonMongoConnection,
  models,
};
