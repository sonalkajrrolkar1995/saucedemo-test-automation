const { expect } = require('@playwright/test');

class ProductsPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.getByTestId('title');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.cartLink = page.getByTestId('shopping-cart-link');
  }

  async addToCartByName(productName) {
    const productCard = this.page
      .getByTestId('inventory-item')
      .filter({ hasText: productName });
    await productCard.getByRole('button', { name: 'Add to cart' }).click();
  }

  async goToCart() {
    await this.cartLink.click();
    await expect(this.page).toHaveURL('/cart.html');
  }

  async verifyPageLoaded() {
    await expect(this.pageTitle).toHaveText('Products');
  }
}

module.exports = ProductsPage;
