var mongo = require('./mongodb');
var refreshToken = require('./refreshToken');

module.exports = function init(nconf) {
  return mongo.init(nconf)
    .then(function() {
      return refreshToken.init(nconf);
    });
};
