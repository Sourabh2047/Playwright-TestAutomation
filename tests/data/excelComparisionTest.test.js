//Import Statements
const fs = require('fs');
const path = require('path');
const { test } = require('@playwright/test');
const csv = require('csv-parser');

// --- Utility Functions ---
const normalize = (str) => str.toLowerCase().trim().replace(/\s+/g, ' ');
const groupMatchers = [
  /pass|passing|passed|run\s+and\s+pass/i,
  /fail|failing|failed/i,
  /not\s+run|not\s+executed/i,
];
const getGroupIndex = (value) => {
  const val = normalize(value);
  return groupMatchers.findIndex(regex => regex.test(val));
};
function determineStatus(expected, actual) {
  const normalize = str => str.trim().toLowerCase();
  const expectedNorm = normalize(expected);
  const actualNorm = normalize(actual);
  if (!expectedNorm || !actualNorm) return "FAIL";
  const expectedPass = /pass|run\s+and\s+pass/.test(expectedNorm);
  const expectedFail = /fail|run\s+and\s+fail|fail\s+with/.test(expectedNorm);
  const actualPass = /pass|passing/.test(actualNorm);
  const actualFail = /fail|failing/.test(actualNorm);
  if ((expectedPass && actualFail) || (expectedFail && actualPass)) {
    return "FAIL";
  }
  const expectedGroup = getGroupIndex(expectedNorm);
  const actualGroup = getGroupIndex(actualNorm);
  if (expectedGroup !== -1 && actualGroup !== -1) {
    return expectedGroup === actualGroup ? "PASS" : "FAIL";
  }
  return "FAIL";
}

// --- Load CSV Data before test run ---
function loadCsvSync() {
  const csvPath = path.join(process.cwd(), 'test-data', 'ComparisonRulesTest.csv');
  const fileData = fs.readFileSync(csvPath, 'utf-8');
  const rows = [];
  const lines = fileData.split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index] ? values[index].trim() : '';
    });
    rows.push(row);
  }
  return rows;
}
const testData = loadCsvSync(); // Load CSV immediately during file loading
test.beforeAll(async () => {
  fs.writeFileSync(
    'environment.properties',
    fs.readFileSync('environment.properties', 'utf-8')
  );
});

// --- Define tests ---
test.describe('Dynamic CSV Tests', () => {
  // Register tests synchronously (no loop causing recursion)
  testData.forEach((row, index) => {
    const testCaseId = row['Test cases'] || `Test Case ${String(index + 1).padStart(4, '0')}`;
    const testCaseSummary = row['Test Case Summary'] || 'No description available';
    const expectedRaw = row['Expected Result'] || '';
    const actualRaw = row['Actual Result'] || '';
    const status = determineStatus(expectedRaw, actualRaw);
    //Test Case Execution for Each Data Row in Excel Sheet
    //test(`${index + 1}. ${testCaseId} - ${testCaseSummary}`, async ({ page }, testInfo)//Optional - Add Title in TC
    test(`${String(index + 1).padStart(4, '0')}. ${testCaseId}`, async ({ page }, testInfo) => {
      await test.step('Test Case Details', async () => {
        const details = `
        Test case ID: ${testCaseId}
        Summary: ${testCaseSummary}
        Expected: ${expectedRaw}
        Actual: ${actualRaw}
        Status: ${status}`;
        // Attach this detail to the Allure report
        await testInfo.attach('Test Case Details', {
          body: details,
          contentType: 'text/plain',
        });
        if (status === 'FAIL') {
          const screenshot = await page.screenshot();
          //await testInfo.attach('Failure Screenshot', { body: screenshot, contentType: 'image/png' }); //Optional If SS needed inside Test Body
          if (testInfo.video) {
            await testInfo.attach('Failure Video', { path: testInfo.video, contentType: 'video/webm' });
          }
          throw new Error(`Test Case ${testCaseId} Failed.\nExpected: ${expectedRaw}\nActual: ${actualRaw}`);
        } else {
          console.log(`✅ ${testCaseId} passed.`);
          console.log('----------------------------------------');
          console.log(`Test case ID: ${testCaseId}`);
          console.log(`Summary: ${testCaseSummary}`);
          console.log(`Expected: ${expectedRaw}`);
          console.log(`Actual: ${actualRaw}`);
          console.log(`Status: ${status}`);
        }
      });
    });
  });
});