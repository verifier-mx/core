const request = require('./request');
const parse = require('./parse');

function validateCaptcha(...args) {
  return request(...args)
    .then(parse);
}

module.exports = validateCaptcha;
