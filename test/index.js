/* global before */

const nconf = require('nconf');

const { init, getConnection } = require('../lib/mongodb');

nconf.defaults({
  authmaker: {
    mongo: {
      db: 'authmaker-common-test-new',
      host: 'localhost',
      port: 27017,
    },
  },
});

before(function () {
  return init(nconf);
});

after(() => {
  getConnection().then((connection) => {
    connection.close();
  });
});
