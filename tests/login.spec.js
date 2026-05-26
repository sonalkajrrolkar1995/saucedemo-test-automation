const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const { standardUser, lockedOutUser, invalidUser } = require('../test-data/users');

test.describe('Login', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('standard user can log in with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(standardUser.username, standardUser.password);
    await loginPage.verifySuccessfulLogin();
  });

  test('locked out user cannot log in and sees an error message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(lockedOutUser.username, lockedOutUser.password);
    await loginPage.verifyErrorMessage('Sorry, this user has been locked out.');
    await expect(page).toHaveURL('/');
  });

  test('user with wrong credentials sees a login error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(invalidUser.username, invalidUser.password);
    await loginPage.verifyErrorMessage('Username and password do not match');
    await expect(page).toHaveURL('/');
  });

  test('user sees an error when submitting empty login form', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('', '');
    await loginPage.verifyErrorMessage('Username is required');
  });

});
