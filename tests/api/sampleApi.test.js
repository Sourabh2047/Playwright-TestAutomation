const { test, expect } = require('@playwright/test');
const axios = require('axios');

test.describe('TC003 - API Test', () => {
  test('Validate GET request to JSONPlaceholder', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('id', 1);
  });
});