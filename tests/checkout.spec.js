const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');
const ConfirmationPage = require('../pages/ConfirmationPage');
const { standardUser } = require('../test-data/users');
const products = require('../test-data/products');
const { validCustomer, errors } = require('../test-data/checkout');

test.describe('Checkout', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(standardUser.username, standardUser.password);
    await expect(page).toHaveURL('/inventory.html');

    const productsPage = new ProductsPage(page);
    await productsPage.addToCartByName(products.backpack.name);
    await productsPage.goToCart();

    const cartPage = new CartPage(page);
    await cartPage.proceedToCheckout();
  });

  test('standard user can complete the full purchase flow and receive an order confirmation', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    const confirmationPage = new ConfirmationPage(page);

    await checkoutPage.fillShippingDetails(
      validCustomer.firstName,
      validCustomer.lastName,
      validCustomer.postalCode
    );
    await checkoutPage.clickContinue();

    const subtotal = await checkoutPage.getSubtotalText();
    expect(subtotal).toContain(products.backpack.price);

    await checkoutPage.clickFinish();
    await confirmationPage.verifyOrderConfirmed();
  });

  test('user sees an error when first name is missing at checkout', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillShippingDetails('', validCustomer.lastName, validCustomer.postalCode);
    await checkoutPage.continueButton.click();
    await checkoutPage.verifyErrorMessage(errors.firstNameRequired);
  });

  test('user sees an error when last name is missing at checkout', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillShippingDetails(validCustomer.firstName, '', validCustomer.postalCode);
    await checkoutPage.continueButton.click();
    await checkoutPage.verifyErrorMessage(errors.lastNameRequired);
  });

  test('user sees an error when postal code is missing at checkout', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillShippingDetails(validCustomer.firstName, validCustomer.lastName, '');
    await checkoutPage.continueButton.click();
    await checkoutPage.verifyErrorMessage(errors.postalCodeRequired);
  });

});
