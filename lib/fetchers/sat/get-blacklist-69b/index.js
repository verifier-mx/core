const request = require('./request');
const parseRow = require('./parse-row');

function getBlacklist69b(...args) {
  return request(parseRow, ...args);
}

module.exports = getBlacklist69b;
