🧪 SauceDemo Playwright Test Automation Suite

Automated end-to-end test suite for the SauceDemo web application, built using Playwright + TypeScript.
This project demonstrates modern test automation practices such as data-driven testing, custom fixtures, Allure reporting, and Lighthouse performance auditing.

🚀 Project Overview

This project validates the functional and performance quality of the SauceDemo e-commerce platform.
It covers major workflows — login, product listing, add-to-cart, and checkout — ensuring both functional correctness and UI consistency.

The test suite is designed for scalability and maintainability using Page Object Model (POM), data-driven testing, and step-based reporting.

🧪 Test Overview

| Tool / Library              | Purpose                                    |
| --------------------------- | ------------------------------------------ |
| **Playwright (TypeScript)** | Web automation framework                   |
| **Allure Reporter**         | Test reporting and visualization           |
| **Lighthouse**              | Performance and accessibility audits       |
| **dotenv**                  | Secure management of environment variables |
| **Node.js**                 | Runtime environment                        |
| **ESLint & Prettier**       | Code quality and formatting                |



📁 Project Structure
saucedemo-tests/
│
├── tests/
│   ├── login.spec.ts
│   ├── inventory.spec.ts
│   ├── cart.spec.ts
│   ├── checkout.spec.ts
│   └── lighthouse.spec.ts
│
├── pages/
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
│
├── data/
│   └── products.json
│
├── shared/
│   └── lighthouse-helper.ts
│
├── utils/
│   └── screenshot-helper.ts
│
├── .env
├── playwright.config.ts
└── README.md


Installation Steps
# Clone the repository
git clone https://github.com/yourusername/saucedemo-playwright.git
cd saucedemo-playwright

# Install dependencies
npm install

# Create .env file for credentials


▶️ How to Run Tests

| Command                      | Description                                                                           |
| ---------------------------- | ------------------------------------------------------------------------------------- |
| `npm run loginpage-ui`       | Runs **UI validation tests** for the Login Page (labels, fields, buttons).            |
| `npm run loginpage-test`     | Runs **functional tests** for Login (valid & invalid login scenarios).                |
| `npm run inventorypage-test` | Runs **functional tests** for Inventory (add-to-cart, product details, navigation).   |
| `npm run inventorypage-ui`   | Runs **UI validation tests** for Inventory Page (product layout, visibility, prices). |
| `npm run performance-test`   | Runs **Lighthouse performance audit** for the SauceDemo website.                      |


🧪 Run All Tests : npx playwright test


📊 Test Results & Reports

| Report Type           | Description                                                          | Output Path                                         |
| --------------------- | -------------------------------------------------------------------- | --------------------------------------------------- |
| **Allure Report**     | Visual dashboard of test results with detailed steps and attachments | `./allure-report`                                   |
| **Lighthouse Report** | HTML performance and accessibility audit                             | `./lighthouse-report/custom-lighthouse-report.html` |
| **Screenshots**       | Captured during test failures or validation steps                    | `./screenshots/`                                    |

🤝 Contributing
Contributions are welcome!
To contribute:

1. Fork the repository
2. Create a new branch (feature/your-feature-name)
3. Commit your changes (git commit -m 'Add new feature')
4. Push to your branch (git push origin feature/your-feature-name)
5. Create a Pull Request


🧩 Troubleshooting

| Issue                           | Possible Cause                        | Solution                                                             |
| ------------------------------- | ------------------------------------- | -------------------------------------------------------------------- |
| Tests fail with login errors    | Missing or invalid `.env` credentials | Verify credentials and `.env` placement                              |
| Lighthouse report not generated | Missing Lighthouse dependency         | Run `npm install` again to ensure dependencies are installed         |
| Allure report not opening       | Report not generated                  | Re-run `npx allure generate allure-results --clean -o allure-report` |
