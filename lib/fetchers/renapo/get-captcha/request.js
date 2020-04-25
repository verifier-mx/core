const axios = require('axios');
const {serializeCookies} = require('../../utils');

const URL = 'https://consultas.curp.gob.mx/CurpSPpruebaRendimiento/captchaCurp';

const buildHeaders = (cookies) => ({
  'Cookie': serializeCookies(cookies)
});

module.exports = (cookies) => {
  const url = URL;
  const method = 'get';
  const responseType = 'arraybuffer';
  const headers = buildHeaders(cookies);
  return axios({ url, method, headers, responseType });
};
