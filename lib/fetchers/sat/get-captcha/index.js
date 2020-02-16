const request = require('./request');
const parse = require('./parse');

function getCaptcha(cookies) {
  return request(cookies)
    .then(parse);
}

module.exports = getCaptcha;
