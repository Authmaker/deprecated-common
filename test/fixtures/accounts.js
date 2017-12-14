/* global rootRequire */

const _ = require('lodash');
const moment = require('moment');
const mongoose = require('mongoose');
const Q = require('q');

const db = rootRequire('lib/mongodb');

const models = db.models;

const usersToCreate = [
  {
    _id: mongoose.Types.ObjectId(),
    email: 'testuser1@stonecircle.io',
    clientId: 'testAccountsFixture',
  },
  {
    _id: mongoose.Types.ObjectId(),
    email: 'testuser2@stonecircle.io',
    clientId: 'testAccountsFixture',
  },
  {
    _id: mongoose.Types.ObjectId(),
    email: 'testuser3@stonecircle.io',
    clientId: 'testAccountsFixture',
  },
  {
    _id: mongoose.Types.ObjectId(),
    email: 'testuser4@stonecircle.io',
    clientId: 'testAccountsFixture',
  },
];

const permissionsToCreate = [
  {
    _id: mongoose.Types.ObjectId(),
    name: 'first permission',
    scope: 'first_permission',
  },
];

const plansToCreate = [
  {
    _id: mongoose.Types.ObjectId(),
    name: 'first plan',
    permissions: [
      permissionsToCreate[0]._id,
    ],
  },
];


const accountsToCreate = [
  {
    _id: mongoose.Types.ObjectId(),
    name: 'superAccount',
    expiry: moment().subtract(1, 'hours').toDate(),
  },

  {
    _id: mongoose.Types.ObjectId(),
    name: 'account with first 3 users',
    expiry: moment().add(1, 'hours').toDate(),
    users: _.chain(usersToCreate)
      .slice(0, 3)
      .map('_id')
      .value(),
  },

  {
    _id: mongoose.Types.ObjectId(),
    name: 'first permission account',
    expiry: moment().add(1, 'hours').toDate(),
    users: [
      usersToCreate[1]._id,
    ],
    plan: plansToCreate[0]._id,
  },

  {
    _id: mongoose.Types.ObjectId(),
    name: 'first permission account',
    expiry: moment().subtract(1, 'hours').toDate(),
    users: [
      usersToCreate[0]._id,
    ],
  },
];

function init() {
  return models.account.create(accountsToCreate).then(function () {
    return models.user.create(usersToCreate);
  })
    .then(function () {
      return models.plan.create(plansToCreate);
    })
    .then(function () {
      return models.permission.create(permissionsToCreate);
    });
}

function reset() {
  // only allow this in test
  if (process.env.NODE_ENV === 'test') {
    return db.getConnection().then(function (connection) {
      const collections = connection.collections;

      const promises = Object.keys(collections).map(function (collection) {
        return Q.ninvoke(collections[collection], 'remove');
      });

      return Q.all(promises);
    });
  }
  // eslint-disable-next-line max-len,vars-on-top
  const errorMessage = 'Excuse me kind sir, but may I enquire as to why you are currently running reset() in a non test environment? I do propose that it is a beastly thing to do and kindly ask you to refrain from this course of action. Sincerely yours, The Computer.';

  console.log(errorMessage); // eslint-disable-line no-console
  console.error(errorMessage); // eslint-disable-line no-console
  throw new Error(errorMessage);
}

module.exports = {
  init,
  reset,
  models,
};
