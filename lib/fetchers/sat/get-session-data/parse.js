const {get} = require('lodash');
const cheerio = require('cheerio');
const {parseCookies} = require('../../utils');

const SUCCESS_STATUS = 200;

function getCookies(response) {
  const setCookies = get(response, 'headers.set-cookie') || [];
  const cookiesStr = setCookies.join(' ');
  return parseCookies(cookiesStr);
}

function getViewState(response) {
  const $ = cheerio.load(response.data);
  return $('#javax\\.faces\\.ViewState').attr('value');
}

module.exports = (response) => {
  if (response.status !== SUCCESS_STATUS) throw new Error('Invalid HTTP status when requesting sessionId');
  return {
    cookies: getCookies(response),
    viewState: getViewState(response)
  };
};
