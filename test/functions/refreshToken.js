var refreshToken = rootRequire('./lib/refreshToken');
var nconf = require('nconf');

describe.skip('refreshToken function', function() {
  describe('during initialise', function() {
    it('should not succeed with invalid credentials');
    it('should succeed with valid credentials', function() {
      nconf.overrides({
        authmaker: {
          server: {
            clientId: 'Mk6LvLVqSh9WYXChuDN8',
            clientSecret: 'faceyfaceface',
            url: 'http://localhost:5000',
          },
        },
      });

      return refreshToken.init(nconf);
    });
  });

  describe('should throw an error', function() {
    it('when the required service is not available as an externalIdentity');
    it('when the required userId is not found');
    it('if authmaker:server is not defined in nconf');
    it('if request to authmaker server fails');
  });

  describe('refreshing a token', function() {
    it('should refresh tokens', function() {
      nconf.overrides({
        authmaker: {
          server: {
            clientId: 'Mk6LvLVqSh9WYXChuDN8',
            clientSecret: 'faceyfaceface',
            url: 'http://localhost:5000',
          },
        },
      });

      return refreshToken.init(nconf).then(function() {
        return refreshToken('57a857e845bac5deccd690ba', 'youtube');
      });
    });
  });
});
