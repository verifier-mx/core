const axios = require('axios');
const {serializeCookies, encodeFormData} = require('../../utils');

const URL = 'https://agsc.siat.sat.gob.mx/PTSC/ValidaRFC/index.jsf';

const buildHeaders = (cookies) => ({
  'Connection': 'keep-alive',
  'Cache-Control': 'max-age=0',
  'Origin': 'https://agsc.siat.sat.gob.mx',
  'Upgrade-Insecure-Requests': '1',
  'Content-Type': 'application/x-www-form-urlencoded',
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
  'Sec-Fetch-User': '?1',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
  'Sec-Fetch-Site': 'same-origin',
  'Sec-Fetch-Mode': 'cors',
  'Referer': 'https://agsc.siat.sat.gob.mx/PTSC/ValidaRFC/index.jsf',
  'Accept-Encoding': 'gzip, deflate, br',
  'Accept-Language': 'en-US,en;q=0.9,es;q=0.8',
  'Cookie': serializeCookies(cookies)
});

const buildFormData = (viewState, rfc) => encodeFormData({
  'formMain': 'formMain',
  'formMain:valRFC': rfc,
  'formMain:consulta': '',
  'javax.faces.ViewState': viewState
});

module.exports = (cookies, viewState, rfc) => {
  const url = URL;
  const method = 'post';
  const headers = buildHeaders(cookies);
  const data = buildFormData(viewState, rfc);
  return axios({ url, method, headers, data });
};
