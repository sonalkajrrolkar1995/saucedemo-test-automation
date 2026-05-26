Test Cases - SauceDemo
======================


1. Test Case Identification
----------------------------

1. Standard user can log in with valid credentials and is redirected to the products page.
2. A locked out user receives an appropriate error message when attempting to log in.
3. Standard user can complete a full purchase from product selection to order confirmation.
4. Products on the inventory page can be sorted by name (A-Z, Z-A) and by price (low to high, high to low).
5. User can add multiple products to the cart and remove individual items.
6. The checkout form displays a validation error when a required field is left empty.
7. The order summary shows the correct item total and tax amount before the order is placed.
8. User can log out via the navigation menu and is redirected to the login page.
9. The product detail page displays the correct name, price, and description for each product.
10. The cart retains items when the user navigates between the cart page and the products page.


2. Detailed Test Case - TC-003
--------------------------------

Test Case ID:   TC-003
Title:          Standard user completes a full purchase from product selection to order confirmation
Priority:       High
Type:           End-to-End
Component:      Checkout

Preconditions:
- The application is accessible at https://www.saucedemo.com
- Valid credentials are available: username standard_user, password secret_sauce
- No items are in the cart before the test starts

Test Steps:

  Step 1  - Navigate to https://www.saucedemo.com
            Expected: Login page is displayed

  Step 2  - Enter username standard_user
            Expected: Username field is populated

  Step 3  - Enter password secret_sauce
            Expected: Password field is populated

  Step 4  - Click the Login button
            Expected: User is redirected to /inventory.html

  Step 5  - Verify the Products heading is visible
            Expected: Page title shows "Products"

  Step 6  - Click "Add to cart" on the Sauce Labs Backpack
            Expected: Cart badge updates to "1"

  Step 7  - Click the cart icon in the top right corner
            Expected: Cart page is displayed at /cart.html

  Step 8  - Verify the Sauce Labs Backpack is listed in the cart
            Expected: Product name is visible in the cart

  Step 9  - Click the Checkout button
            Expected: Checkout step 1 is displayed at /checkout-step-one.html

  Step 10 - Enter first name "John", last name "Doe", postal code "12345"
            Expected: All fields are populated

  Step 11 - Click the Continue button
            Expected: Checkout step 2 is displayed at /checkout-step-two.html

  Step 12 - Verify the item total shows "$29.99"
            Expected: Item total: $29.99 is visible

  Step 13 - Verify a tax amount is displayed
            Expected: Tax line is visible with a calculated value

  Step 14 - Click the Finish button
            Expected: Confirmation page is displayed at /checkout-complete.html

  Step 15 - Verify the confirmation heading
            Expected: "Thank you for your order!" is displayed

Expected Final Result: Order is completed. Confirmation page shows "Thank you for your order!" with the dispatch message below it.

Postconditions: Cart is empty. User is on /checkout-complete.html.


3. Test Case Priority
-----------------------

Rank 1  - Login with valid credentials
          Login is the entry point to the entire application. All other test cases depend on it.
          A failure here blocks every other feature.

Rank 2  - Complete checkout flow
          This is the core business function. A defect in the purchase flow has direct business
          impact and blocks the main user journey.

Rank 3  - Cart - add and remove items
          The cart is a required step before checkout. If adding or removing items fails,
          the checkout flow cannot proceed.

Rank 4  - Checkout form validation
          Missing validation allows incomplete orders to be submitted. This has data quality
          and user experience implications.

Rank 5  - Product sorting
          Sorting affects how users find products. Important for usability but does not block
          the purchase flow.

Rank 6  - Order summary totals
          Correct price calculation is important but sits downstream of the cart and checkout
          flow working correctly.

Rank 7  - Product detail page
          Correct product information matters but a defect here is unlikely to block the
          purchase flow entirely.

Rank 8  - Logout
          Security-relevant but lower priority than purchase flow defects in this context.

Rank 9  - Locked out user error message
          A boundary case for a specific account type. Important but not on the critical path.

Rank 10 - Cart persistence across navigation
          An edge case related to user experience. Not on the critical purchase path.


4. Future Plans
-----------------

CI/CD Integration
Connect the test suite to GitHub Actions so tests run automatically on every pull request.
This catches regressions before they reach the main branch.

API-Level Test Setup
Where possible, set up test preconditions via API calls rather than navigating through the UI.
This reduces test duration and removes UI dependencies from the setup phase.

Visual Regression Testing
Add screenshot comparison for key pages to detect unintended UI changes between releases.

Accessibility Checks
Use the Playwright accessibility snapshot API to check for WCAG violations on the main user flows.

Extended Browser Coverage
Add WebKit to the browser matrix to cover Safari users. Currently the suite runs on Chrome
and Firefox only.

Performance Testing
The application has a performance_glitch_user account that simulates slow page loads. Add tests
that verify the suite handles delayed responses without timing out.

Negative API Tests
Add HTTP-level tests that verify the application returns correct status codes and does not expose
sensitive information in error responses.
