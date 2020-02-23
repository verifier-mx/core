const fetchRfcStatus = require(`${ROOT_PATH}/lib/use-cases/sat/fetch-rfc-status`);
const {serializeCookies, encodeFormData} = require(`${ROOT_PATH}/lib/fetchers/utils`);
const {getGoogleCloudApiKey} = require(`${ROOT_PATH}/config`);
const {mockResponses} = testUtils;

const RFC = 'TORM91101497A';
const COOKIES = serializeCookies({
  'JSESSIONID': 'Xe5QQ7DnE4aRkmpnrEeGdXgH9aI6xrWKBsoV2eKeze2bpeO2JR_u!1176736271!1895662390',
  'Sticky-Padron-de-importadores-Contri9080': '185546762.30755.0000',
  'ZNPCQ003-36373300': 'c759e878',
  'F5-PROD-SIAT-AGSC-443': '1800419338.47873.0000'
});
const CAPTCHA_TEXT = '9WW4S';
const VIEW_STATE = '-4798378679272502056:8767500030069814135';
const VALIDATE_CAPTCHA_DATA = encodeFormData({
  'javax.faces.partial.ajax': 'true',
  'javax.faces.source': 'formMain:j_idt57',
  'javax.faces.partial.execute': '@all',
  'javax.faces.partial.render': 'formMain',
  'formMain:j_idt57': 'formMain:j_idt57',
  'formMain': 'formMain',
  'formMain:captchaInput': CAPTCHA_TEXT,
  'javax.faces.ViewState': VIEW_STATE
});
const VERIFY_RFC_DATA = encodeFormData({
  'formMain': 'formMain',
  'formMain:valRFC': RFC,
  'formMain:consulta': '',
  'javax.faces.ViewState': VIEW_STATE
});

describe('Use cases | sat | .fetchRfcStatus', () => {
  beforeEach(() => {
    mockResponses.sat.getSessionData.successfulResponse();
    mockResponses.sat.getCaptcha.successfulResponse(COOKIES);
    mockResponses.googleCloud.textDetection.successfulResponse(getGoogleCloudApiKey());
    mockResponses.sat.validateCaptcha.successfulResponse(COOKIES, VALIDATE_CAPTCHA_DATA);
    mockResponses.sat.verifyRfc.registeredResponse(COOKIES, VERIFY_RFC_DATA);
  });

  describe('Successful execution', () => {
    it('should return the RFC data', async () => {
      const expectedResponse = {
        message: 'RFC válido, y susceptible de recibir facturas',
        isValid: true,
        isRegistered: true
      };
      const response = await fetchRfcStatus(RFC);
      expect(response).to.be.eql(expectedResponse);
    });
  });
});
