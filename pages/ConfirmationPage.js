const { expect } = require('@playwright/test');

class ConfirmationPage {
  constructor(page) {
    this.page = page;
    this.confirmationHeader = page.getByTestId('complete-header');
    this.confirmationText = page.getByTestId('complete-text');
    this.backHomeButton = page.getByTestId('back-to-products');
  }

  async verifyOrderConfirmed() {
    await expect(this.confirmationHeader).toHaveText('Thank you for your order!');
    await expect(this.confirmationText).toContainText('Your order has been dispatched');
  }

  async clickBackHome() {
    await this.backHomeButton.click();
    await expect(this.page).toHaveURL('/inventory.html');
  }
}

module.exports = ConfirmationPage;
