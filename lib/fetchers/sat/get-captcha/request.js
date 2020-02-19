const axios = require('axios');
const {serializeCookies} = require('../../utils');

const URL = 'https://agsc.siat.sat.gob.mx/PTSC/ValidaRFC/captchaReload';

const buildHeaders = (cookies) => ({
  'Connection': 'keep-alive',
  'Content-Length': '0',
  'Accept': 'text/plain, */*; q=0.01',
  'X-Requested-With': 'XMLHttpRequest',
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
  'Origin': 'https://agsc.siat.sat.gob.mx',
  'Sec-Fetch-Site': 'same-origin',
  'Sec-Fetch-Mode': 'cors',
  'Referer': 'https://agsc.siat.sat.gob.mx/PTSC/ValidaRFC/index.jsf',
  'Accept-Encoding': 'gzip, deflate, br',
  'Accept-Language': 'en-US,en;q=0.9,es;q=0.8',
  'Cookie': serializeCookies(cookies)
});

module.exports = (cookies) => {
  const url = URL;
  const method = 'post';
  const headers = buildHeaders(cookies);
  return axios({ url, method, headers });
};