/* global before */

var nconf = require('nconf');

var dbConnectionFunction = require('../lib/mongodb').init;

nconf.defaults({
  authmaker: {
    mongo: {
      db: 'authmaker-common-test-new',
      host: 'localhost',
      port: 27017,
    },
  },
});

before(function() {
  return dbConnectionFunction(nconf);
});
