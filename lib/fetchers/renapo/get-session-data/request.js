const axios = require('axios');

const URL = 'https://consultas.curp.gob.mx/CurpSPpruebaRendimiento/renapo/inicio.jsp';

module.exports = () => {
  const url = URL;
  const method = 'get';
  return axios({ url, method });
};
