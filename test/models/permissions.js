/* global rootRequire, describe, beforeEach, afterEach, it */
/* eslint-disable max-len */

var expect = require('chai').expect;

var fixture = rootRequire('test/fixtures/accounts');

describe('permissions model test', function() {
  beforeEach(function() {
    return fixture.init();
  });

  afterEach(function() {
    return fixture.reset();
  });

  it('user testuser4@stonecircle.io should not have any permissions - not in an account', function() {
    return fixture.models.user.findOne({ email: 'testuser4@stonecircle.io' }).then(function(user) {
      return user.getActivePermissions().then(function(permissions) {
        expect(permissions.length).to.be.equal(0);
      });
    });
  });

  it('user testuser3@stonecircle.io should not have any permissions - in an active account with no permissions', function() {
    return fixture.models.user.findOne({ email: 'testuser3@stonecircle.io' }).then(function(user) {
      return user.getActivePermissions().then(function(permissions) {
        expect(permissions.length).to.be.equal(0);
      });
    });
  });

  it('user testuser2@stonecircle.io should have exactly one permission - in an active account with 1 permission', function() {
    return fixture.models.user.findOne({ email: 'testuser2@stonecircle.io' }).then(function(user) {
      return user.getActivePermissions().then(function(permissions) {
        expect(permissions.length).to.be.equal(1);
      });
    });
  });

  it('user testuser2@stonecircle.io should have access to the first_permission scope', function() {
    return fixture.models.user.findOne({ email: 'testuser2@stonecircle.io' }).then(function(user) {
      return user.getActivePermissionScopes().then(function(scopes) {
        expect(scopes).to.contain('first_permission');
      });
    });
  });

  it('user testuser1@stonecircle.io should no permisssions - in an expired account with 1 permission', function() {
    return fixture.models.user.findOne({ email: 'testuser1@stonecircle.io' }).then(function(user) {
      return user.getActivePermissions().then(function(permissions) {
        expect(permissions.length).to.be.equal(0);
      });
    });
  });
});
