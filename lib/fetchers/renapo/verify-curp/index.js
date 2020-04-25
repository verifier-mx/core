const request = require('./request');
const parse = require('./parse');

function verifyRfc(...args) {
  return request(...args)
    .then(parse);
}

module.exports = verifyRfc;
