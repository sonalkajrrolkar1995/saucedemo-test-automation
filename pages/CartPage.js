const { expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.getByTestId('title');
    this.itemNames = page.getByTestId('inventory-item-name');
    this.cartItems = page.getByTestId('inventory-item');
    this.checkoutButton = page.getByTestId('checkout');
    this.continueShoppingButton = page.getByTestId('continue-shopping');
  }

  async verifyPageLoaded() {
    await expect(this.pageTitle).toHaveText('Your Cart');
  }

  async verifyItemInCart(productName) {
    await expect(
      this.itemNames.filter({ hasText: productName })
    ).toBeVisible();
  }

  async verifyItemNotInCart(productName) {
    await expect(
      this.itemNames.filter({ hasText: productName })
    ).not.toBeVisible();
  }

  async removeItem(productName) {
    const itemRow = this.page
      .getByTestId('inventory-item')
      .filter({ hasText: productName });
    await itemRow.getByRole('button', { name: 'Remove' }).click();
  }

  async getItemCount() {
    return await this.cartItems.count();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
    await expect(this.page).toHaveURL('/checkout-step-one.html');
  }
}

module.exports = CartPage;
