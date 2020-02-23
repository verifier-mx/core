const verifyRfc = require(`${ROOT_PATH}/lib/fetchers/sat/verify-rfc`);
const {serializeCookies, encodeFormData} = require(`${ROOT_PATH}/lib/fetchers/utils`);
const {mockResponses} = testUtils;

const COOKIES = {
  'JSESSIONID': 'Xe5QQ7DnE4aRkmpnrEeGdXgH9aI6xrWKBsoV2eKeze2bpeO2JR_u!1176736271!1895662390',
  'Sticky-Padron-de-importadores-Contri9080': '185546762.30755.0000',
  'ZNPCQ003-36373300': 'c759e878',
  'F5-PROD-SIAT-AGSC-443': '1800419338.47873.0000'
};
const VIEW_STATE = '-4798378679272502056:8767500030069814135';
const RFC = 'TORM91101497A';
const EXPECTED_DATA = {
  'formMain': 'formMain',
  'formMain:valRFC': RFC,
  'formMain:consulta': '',
  'javax.faces.ViewState': VIEW_STATE
};

describe('Fertchers | sat | .verifyRfc', () => {
  describe('RFC is registered in SAT', () => {
    beforeEach(() => {
      mockResponses.sat.verifyRfc.registeredResponse(serializeCookies(COOKIES), encodeFormData(EXPECTED_DATA));
    });

    it('should respond with a valid RFC information', async () => {
      const response = await verifyRfc(COOKIES, VIEW_STATE, RFC);

      expect(response).to.be.eql({
        message: 'RFC válido, y susceptible de recibir facturas',
        isValid: true,
        isRegistered: true
      });
    });
  });

  describe('RFC is not registered in SAT', () => {
    beforeEach(() => {
      mockResponses.sat.verifyRfc.unregisteredResponse(serializeCookies(COOKIES), encodeFormData(EXPECTED_DATA));
    });

    it('should respond with invalid RFC data', async () => {
      const response = await verifyRfc(COOKIES, VIEW_STATE, RFC);

      expect(response).to.be.eql({
        message: 'RFC no registrado en el padrón de contribuyentes',
        isValid: true,
        isRegistered: false
      });
    });
  });

  describe('RFC is invalid', () => {
    beforeEach(() => {
      mockResponses.sat.verifyRfc.invalidFormatResponse(serializeCookies(COOKIES), encodeFormData(EXPECTED_DATA));
    });

    it('should respond with invalid RFC data', async () => {
      const response = await verifyRfc(COOKIES, VIEW_STATE, RFC);

      expect(response).to.be.eql({
        message: 'Estructura del RFC incorrecta',
        isValid: false,
        isRegistered: false
      });
    });
  });
});
