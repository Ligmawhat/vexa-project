const fs = require('fs');
const path = require('path');

const apis = {};

fs.readdirSync(__dirname).forEach((apiFileName) => {
  const apiName = apiFileName.slice(0, apiFileName.indexOf('.'));
  apis[apiName] = require(path.join(__dirname, apiFileName));
});

module.exports = apis;
