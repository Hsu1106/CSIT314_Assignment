const { test, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const UserAccount = require('../backend/entity/UserAccount');
const LoginController = require('../backend/controller/LoginController');
const { createTestDatabase, profileId } = require('./helpers');

let controller;

beforeEach(() => {
  const db = createTestDatabase();
  const userAccount = new UserAccount(db);
  userAccount.createUserAccount({
    username: 'designer1',
    password: 'pass1234',
    profileId: profileId(db, 'Interior Designer'),
  });
  controller = new LoginController(userAccount);
});

test('returns success and account for valid credentials', () => {
  const result = controller.login('designer1', 'pass1234');
  assert.equal(result.success, true);
  assert.equal(result.account.profile, 'Interior Designer');
});

test('rejects empty username or password', () => {
  assert.equal(controller.login('', 'pass1234').success, false);
  assert.equal(controller.login('designer1', '').success, false);
});

test('rejects invalid credentials', () => {
  const result = controller.login('designer1', 'wrong');
  assert.equal(result.success, false);
  assert.equal(result.message, 'Invalid username or password');
});
