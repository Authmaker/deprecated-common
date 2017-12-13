var Q = require('q');
var rp = require('request-promise');

var oauthConfig;

module.exports = function refreshToken(userId, service) {
  if (!oauthConfig) {
    return Q.promise(function(resolve, reject) {
      reject('not initialised');
    });
  }

  return rp({
    url: `${oauthConfig.url}/api/v1/admin/refreshToken`,
    json: true,
    auth: {
      user: oauthConfig.clientId,
      pass: oauthConfig.clientSecret,
    },
    body: {
      userId: userId,
      service: service,
    },
  });
};

module.exports.init = function initRefreshToken(nconf) {
  return Q.ninvoke(nconf, 'get', 'authmaker:server').then(function(config) {
    if (!config || !config.url || !config.clientId || !config.clientSecret) {
      return Q();
    }

    // do a test checkin with the authmaker server
    return rp({
      url: `${config.url}/api/v1/admin/ping`,
      auth: {
        user: config.clientId,
        pass: config.clientSecret,
      },
    }).then(function() {
      oauthConfig = config;
    }, function() {
      // ignore errors here;
    });
  });
};
