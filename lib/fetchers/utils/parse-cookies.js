const {omit} = require('lodash');
const cookie = require('cookie');

const IGNORE_COOKIES = ['path', 'expires', 'Path', 'Domain'];
const IGNORE_KEY_STR = ['Httponly', 'HttpOnly', 'Secure'];

module.exports = (str) => {
  const cookies = omit(cookie.parse(str), IGNORE_COOKIES);
  return Object.keys(cookies).reduce((response, key) => {
    const parsedKey = IGNORE_KEY_STR.reduce((prev, ignore) => prev.replace(ignore, ''), key).trim();
    return Object.assign(response, { [parsedKey]: cookies[key] });
  }, {});
};
