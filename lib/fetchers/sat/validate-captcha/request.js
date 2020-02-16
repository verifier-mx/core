const axios = require('axios');
const {serializeCookies, encodeFormData} = require('../../utils');

const SESSION_NAME = 'JSESSIONID';
const URL = 'https://agsc.siat.sat.gob.mx/PTSC/ValidaRFC/index.jsf';

const buildHeaders = (cookies) => ({
  'Connection': 'keep-alive',
  'Accept': 'application/xml, text/xml, */*; q=0.01',
  'X-Requested-With': 'XMLHttpRequest',
  'Faces-Request': 'partial/ajax',
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'Origin': 'https://agsc.siat.sat.gob.mx',
  'Sec-Fetch-Site': 'same-origin',
  'Sec-Fetch-Mode': 'cors',
  'Referer': 'https://agsc.siat.sat.gob.mx/PTSC/ValidaRFC/index.jsf',
  'Accept-Encoding': 'gzip, deflate, br',
  'Accept-Language': 'en-US,en;q=0.9,es;q=0.8',
  'Cookie': serializeCookies(cookies)
});

const buildFormData = (viewState, captchaText) => encodeFormData({
  'javax.faces.partial.ajax': 'true',
  'javax.faces.source': 'formMain:j_idt57',
  'javax.faces.partial.execute': '@all',
  'javax.faces.partial.render': 'formMain',
  'formMain:j_idt57': 'formMain:j_idt57',
  'formMain': 'formMain',
  'formMain:captchaInput': captchaText,
  'javax.faces.ViewState': viewState
});

module.exports = ({cookies, viewState, captchaText}) => {
  const url = `${URL};jsessionid=${cookies[SESSION_NAME]}`;
  const method = 'post';
  const headers = buildHeaders(cookies);
  const data = buildFormData(viewState, captchaText);
  return axios({ url, method, headers, data });
};
