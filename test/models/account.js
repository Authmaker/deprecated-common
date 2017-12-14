/* global rootRequire, describe, beforeEach, afterEach, it */

const expect = require('chai').expect;

const fixture = rootRequire('test/fixtures/accounts');

describe('accounts model test', function () {
  beforeEach(function () {
    return fixture.init();
  });

  afterEach(function () {
    return fixture.reset();
  });

  it('should be able to access the database', function () {
    return fixture.models.account.findOne();
  });

  it('user testuser2@stonecircle.io should be in at least one account', function () {
    return fixture.models.user.findOne({ email: 'testuser2@stonecircle.io' }).then(function (user) {
      return user.getAccounts().then(function (accounts) {
        expect(accounts.length).to.be.at.least(1);
      });
    });
  });

  it('user testuser4@stonecircle.io should not be in any account', function () {
    return fixture.models.user.findOne({ email: 'testuser4@stonecircle.io' }).then(function (user) {
      return user.getAccounts().then(function (accounts) {
        expect(accounts.length).to.be.equal(0);
      });
    });
  });
});
