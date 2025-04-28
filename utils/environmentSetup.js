const fs = require('fs');
fs.writeFileSync('allure-results/environment.properties',
  `ENV=${process.env.ENV}\nBROWSER=${process.env.BROWSER}`);
