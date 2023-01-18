const fs = require('fs');
const thePackage = require('../package.json');

const newPackage = {
  ...thePackage,
  homepage: process.env.APP_HOMEPAGE || 'https://push-nuck-front.onrender.com/',
};

// eslint-disable-next-line no-console
console.log('Update package.json');
fs.writeFileSync('package.json', JSON.stringify(newPackage, false, 2));
