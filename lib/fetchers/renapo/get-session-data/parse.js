const {get} = require('lodash');
const {parseCookies} = require('../../utils');

const SUCCESS_STATUS = 200;

function getCookies(response) {
  const setCookies = get(response, 'headers.set-cookie') || [];
  const cookiesStr = setCookies.join(' ');
  return parseCookies(cookiesStr);
}

module.exports = (response) => {
  if (response.status !== SUCCESS_STATUS) throw new Error('Invalid HTTP status when requesting Renapo session data');
  return {
    cookies: getCookies(response)
  };
};
