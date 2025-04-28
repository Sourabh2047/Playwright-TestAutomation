// utils/excelReader.js
import * as XLSX from 'xlsx';
import fs from 'fs';

export function loadExcelData(filePath, sheetName) {
  const workbook = XLSX.readFile(filePath);
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
  return data;
}