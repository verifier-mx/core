const fs = require('fs');
const path = require('path');
const nock = require('nock');
const verifyRfc = require(`${ROOT_PATH}/lib/fetchers/sat/verify-rfc`);
const {serializeCookies, encodeFormData} = require(`${ROOT_PATH}/lib/fetchers/utils`);

const COOKIES = {
  'JSESSIONID': 'gC5bKQrVEZ1sajc6oQlguUjhthPmQXS12DMdN3VolVNX9PTdW5My!-631946176!-240505793',
  'Sticky-Padron-de-importadores-Contri9080': '135215114.30755.0000',
  'ZNPCQ003-36373300': 'c759e878',
  'F5-PROD-SIAT-AGSC-443': '1733310474.47873.0000'
};
const VIEW_STATE = '-4798378679272502056:8767500030069814135';
const SERVICE_URL = 'https://agsc.siat.sat.gob.mx';
const SERVICE_PATH = '/PTSC/ValidaRFC/index.jsf';
const RFC = 'TORM91101497A';
const EXPECTED_DATA = {
  'formMain': 'formMain',
  'formMain:valRFC': RFC,
  'formMain:consulta': '',
  'javax.faces.ViewState': VIEW_STATE
};

describe('Fertchers | sat | .verifyRfc', () => {
  describe('Successful validation', () => {
    beforeEach(() => {
      const response = requireXml('./successful-response.xml');
      nock(SERVICE_URL, { encodedQueryParams: true })
        .matchHeader('Cookie', serializeCookies(COOKIES))
        .post(SERVICE_PATH, encodeFormData(EXPECTED_DATA))
        .reply(200, response);
    });

    it('should respond with a valid RFC information', async () => {
      const response = await verifyRfc(COOKIES, VIEW_STATE, RFC);

      expect(response).to.be.eql({
        message: 'RFC válido, y susceptible de recibir facturas',
        isValid: true,
        canInvoice: true
      });
    });
  });

  describe('Failed validation', () => {
    beforeEach(() => {
      const response = requireXml('./failed-response.xml');
      nock(SERVICE_URL, { encodedQueryParams: true })
        .matchHeader('Cookie', serializeCookies(COOKIES))
        .post(SERVICE_PATH, encodeFormData(EXPECTED_DATA))
        .reply(200, response);
    });

    it('should respond with invalid RFC data', async () => {
      const response = await verifyRfc(COOKIES, VIEW_STATE, RFC);

      expect(response).to.be.eql({
        message: 'RFC no registrado en el padrón de contribuyentes',
        isValid: false,
        canInvoice: false
      });
    });
  });
});

function requireXml(file) {
  const filePath = path.join(__dirname, file);
  return fs.readFileSync(filePath);
}
