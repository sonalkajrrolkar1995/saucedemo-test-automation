# SauceDemo Test Automation

Playwright test automation project for [saucedemo.com](https://www.saucedemo.com). Covers login, cart, and the full checkout flow on Chrome and Firefox.

---

## Requirements

- Node.js 18 or above
- npm 8 or above

---

## Setup

```bash
git clone https://github.com/sonalkajrrolkar1995/saucedemo-test-automation
cd saucedemo-test-automation
npm install
npx playwright install
```

---

## Running Tests

```bash
npm test
npm run test:chromium
npm run test:firefox
npm run report
```

---

## Project Structure

```
pages/              Page Object classes, one per page of the application
tests/              Test spec files, one per feature area
test-data/          Credentials, product names, checkout data
playwright.config.js
test-cases.md       Test case identification, priorities, and TCMS detail
```

**Pages**

Each page has one class in `pages/`. The class holds all locators and all actions for that page. Test files contain no locators - they only call methods on page objects.

| File | Page |
|------|------|
| LoginPage.js | Login page |
| ProductsPage.js | Product inventory page |
| CartPage.js | Shopping cart page |
| CheckoutPage.js | Checkout step 1 and step 2 |
| ConfirmationPage.js | Order confirmation page |

**Tests**

| File | What it covers |
|------|----------------|
| login.spec.js | Valid login, locked out user, wrong credentials, empty form |
| checkout.spec.js | Full purchase flow, validation errors on missing fields |
| cart.spec.js | Add to cart, add multiple items, remove item, price check |

**Test Data**

All credentials, product names, and expected values are in `test-data/`. Nothing is hardcoded in test files. If a value changes on the site, it is updated in one place only.

---

## Browsers

Tests run on **Chrome** and **Firefox**.

Chrome runs headed so you can watch the tests run. Firefox runs headless to avoid the startup slowness that causes timeouts in headed mode.

To add a browser, add a project entry in `playwright.config.js` following the same pattern.

---

## How to Contribute

Fork the repository and create a branch from `main`. Name the branch after the change, for example `add-sorting-tests` or `fix-cart-locator`.

Before opening a pull request, run the full test suite and confirm all tests pass:

```bash
npm test
```

All tests must pass before the pull request is reviewed.

Follow the existing structure:
- New page classes go in `pages/`
- New test files go in `tests/`
- New test data goes in `test-data/`
- One class per page, one spec file per feature area

---

## Best Practices

**Locators**
Use `getByTestId()` for elements with a `data-test` attribute. Use `getByRole()` for buttons, links, and headings. Do not use XPath. Do not use CSS class selectors - they break when the UI changes.

Reference: [Playwright locator documentation](https://playwright.dev/docs/locators)

**Waiting**
Do not use `waitForTimeout()` or any fixed sleep. Playwright waits automatically before each interaction. Use `await expect(locator).toBeVisible()` to assert readiness where needed.

Reference: [Playwright auto-waiting](https://playwright.dev/docs/actionability)

**Test Independence**
Each test must run on its own without depending on another test. Playwright gives each test a fresh browser context. Use `beforeEach` for shared setup steps.

**Test Data**
Store all credentials, product names, and expected values in `test-data/`. Do not hardcode strings inside test files.

**Naming**
- Test names describe what the user does: `user can log in with valid credentials`
- Method names start with a verb: `login()`, `addToCartByName()`, `verifyOrderConfirmed()`
- Page object files use PascalCase: `LoginPage.js`, `CartPage.js`
- Test spec files use kebab-case: `login.spec.js`, `cart.spec.js`

---

## Future Plans

**CI/CD integration**
Add a GitHub Actions workflow so tests run automatically on every pull request. This catches regressions before they reach the main branch.

**API-level test setup**
Set up test preconditions via API calls instead of navigating through the UI. This reduces test run time and makes setup steps more reliable.

**Visual regression testing**
Add screenshot comparison for key pages to detect unintended UI changes between releases.

**Accessibility checks**
Use the Playwright accessibility snapshot API to check for WCAG violations on the main user flows.

**WebKit coverage**
Add WebKit to the browser matrix to cover Safari users.

**Performance testing**
The application has a `performance_glitch_user` account that simulates slow page loads. Add tests that verify the suite handles delayed responses without timing out.

---

## Author

Sonal Kajrolkar
GitHub: [sonalkajrrolkar1995](https://github.com/sonalkajrrolkar1995)
LinkedIn: https://www.linkedin.com/in/sonalkajrolkar/
