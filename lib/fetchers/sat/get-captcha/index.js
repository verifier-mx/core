const request = require('./request');
const parse = require('./parse');

function getCaptcha(...args) {
  return request(...args)
    .then(parse);
}

module.exports = getCaptcha;
