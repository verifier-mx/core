const request = require('./request');
const parse = require('./parse');

function validateCaptcha(sessionId, chaptchaText) {
  return request(sessionId, chaptchaText)
    .then(parse);
}

module.exports = validateCaptcha;
