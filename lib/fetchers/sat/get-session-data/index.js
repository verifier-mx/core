const request = require('./request');
const parse = require('./parse');

function getSessionData() {
  return request()
    .then(parse);
}

module.exports = getSessionData;
