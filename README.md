🎯 Playwright Test Automation Framework

✨ Overview

This is a robust Playwright Automation Framework built using TypeScript/JavaScript, ready for CI/CD integration, API testing, and data-driven testing.It supports multiple data sources like JSON, CSV, and Excel (XLSX) files, and generates detailed Allure and Playwright HTML reports 📊.

🔥 Key Features

🧪 Web UI Automation (Playwright)

📜 API Automation Support

📚 Data-Driven Testing (JSON, CSV, XLSX)

👢 POM Design Pattern (Page Object Model)

🌍 Multi-Browser Support (Chromium, Firefox, Webkit)

📄 Properties File for environment details (URL, credentials, etc.)

🧹 Optimized Code Structure (Reusable utils, helpers)

📈 Allure Reporting + Default Playwright Reports

⚙️ CI/CD Ready (GitHub Actions, GitLab, Jenkins pipelines)

🚀 Installation & Setup

# Clone the repository
git clone https://github.com/Sourabh2047/Playwright-TestAutomation.git

# Navigate to project directory
cd your-playwright-framework

# Install dependencies
npm install

⚙️ Project Structure

📂 tests/                 # Test scripts organized by modules
📂 pages/                 # Page Objects (POM Design)
📂 test-data/             # Test Data (JSON, XLSX, CSV)
📂 utils/                 # Utility classes (Helper methods, API utilities)
📂 config/                # Properties file for environment management
📂 test-reports/          # Allure and Playwright HTML reports
playwright.config.ts      # Playwright configuration
package.json              # Project dependencies and scripts
README.md                 # This file

🧪 Running the Tests

1. Run All Tests (All Browsers)

npx playwright test

2. Run with Specific Browser (Chrome/Firefox/Webkit)

npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

3. Run Specific Test File

npx playwright test tests/nameOfTestFile.test.ts

📊 Reporting

Generate Playwright HTML Report

npx playwright show-report

Generate Allure Report

# Step 1: Run tests with allure results
npx playwright test --reporter=line,allure-playwright

# Step 2: Generate the report
allure generate ./allure-results --clean -o ./allure-report

# Step 3: Open the report
allure open ./allure-report

🌐 Data Sources

JSON files for simple key-value pair data

XLSX (Excel) for large datasets

CSV files for list-based inputs

Data Reader Utilities are available to fetch data dynamically based on your needs. 🛠️

⚡ Environment Handling

Environment variables are handled via a config/properties.ts file.You can switch between QA, UAT, and PROD easily by changing the environment parameter. 🌍

Example:

export const envDetails = {
  baseUrl: "https://your-qa-environment.com",
  username: "testuser",
  password: "password123"
}

🛠️ CI/CD Integration

Easily pluggable with:

GitHub Actions

GitLab CI

Jenkins

Azure DevOps Pipelines

Sample GitHub Action trigger:

- name: Run Playwright Tests
  run: |
    npm install
    npx playwright install
    npx playwright test

🙌 Contribution Guidelines

Feel free to raise issues, suggest improvements, or contribute new utilities!


🤝 Connect With Me

🔗 LinkedIn: www.linkedin.com/in/sourabh2047

✉️ Email: sourabhkedar2047@gmail.com

🚀 Happy Automating with Playwright!

