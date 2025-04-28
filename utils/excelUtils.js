const xlsx = require('xlsx');

function readAndCompareExcel(filePath, sheetName) {
  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet);
  return data.map((row, index) => ({
    row: index + 2,
    expected: row.Expected,
    actual: row.Actual
  }));
}

module.exports = { readAndCompareExcel };
