const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');
const { standardUser } = require('../test-data/users');
const products = require('../test-data/products');

test.describe('Cart', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(standardUser.username, standardUser.password);
    await expect(page).toHaveURL('/inventory.html');
  });

  test('added product appears in the cart with the correct name', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.addToCartByName(products.backpack.name);
    await expect(productsPage.cartBadge).toHaveText('1');

    await productsPage.goToCart();
    await cartPage.verifyItemInCart(products.backpack.name);
  });

  test('user can add two products and both appear in the cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.addToCartByName(products.backpack.name);
    await productsPage.addToCartByName(products.bikeLight.name);
    await expect(productsPage.cartBadge).toHaveText('2');

    await productsPage.goToCart();
    await cartPage.verifyItemInCart(products.backpack.name);
    await cartPage.verifyItemInCart(products.bikeLight.name);
    expect(await cartPage.getItemCount()).toBe(2);
  });

  test('user can remove a product from the cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.addToCartByName(products.backpack.name);
    await productsPage.goToCart();
    await cartPage.verifyItemInCart(products.backpack.name);

    await cartPage.removeItem(products.backpack.name);
    await cartPage.verifyItemNotInCart(products.backpack.name);
    expect(await cartPage.getItemCount()).toBe(0);
  });

  test('cart shows correct price for the added product', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.addToCartByName(products.backpack.name);
    await productsPage.goToCart();

    const priceRow = page
      .getByTestId('inventory-item')
      .filter({ hasText: products.backpack.name });
    await expect(priceRow.getByTestId('inventory-item-price')).toHaveText(products.backpack.price);
  });

});
