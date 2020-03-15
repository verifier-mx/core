const verifyRfc = require(`${ROOT_PATH}/lib/use-cases/sat/verify-rfc`);
const {serializeCookies, encodeFormData} = require(`${ROOT_PATH}/lib/fetchers/utils`);
const {getGoogleCloudApiKey} = require(`${ROOT_PATH}/config`);
const database = require('verifier-database');
const {VALID_RFC} = require('./constants.json');
const {mockResponses, resetDatabase, insertFixtures} = testUtils;

const SUCCESSFUL_RESPONSE = {
  isValid: true,
  isRegistered: true,
  rfc: VALID_RFC,
  type: 'person',
  satMessage: 'ok',
  blacklist69: [],
  blacklist69b: null
};
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
  'formMain:valRFC': VALID_RFC,
  'formMain:consulta': '',
  'javax.faces.ViewState': VIEW_STATE
});

describe('Use cases | sat | .verifyRfc', () => {
  const fixtures = require('./fixtures');

  describe('When RFC is cached already', () => {
    beforeEach(async () => {
      await resetDatabase();
      await insertFixtures(fixtures);
    });

    it('should return RFC stored in DB', async () => {
      const response = await verifyRfc({database, rfc: VALID_RFC});
      expect(response).to.be.eql(SUCCESSFUL_RESPONSE);
    });
  });

  describe('When RFC is not cached', () => {
    beforeEach(async () => {
      await resetDatabase();
      mockResponses.sat.getSessionData.successfulResponse();
      mockResponses.sat.getCaptcha.successfulResponse(COOKIES);
      mockResponses.googleCloud.textDetection.successfulResponse(getGoogleCloudApiKey());
      mockResponses.sat.validateCaptcha.successfulResponse(COOKIES, VALIDATE_CAPTCHA_DATA);
      mockResponses.sat.verifyRfc.registeredResponse(COOKIES, VERIFY_RFC_DATA);
    });

    it('should ask status to SAT and upsert result in DB', async () => {
      const response = await verifyRfc({database, rfc: VALID_RFC});
      expect(response).to.be.eql({
        ...SUCCESSFUL_RESPONSE,
        satMessage: 'RFC válido, y susceptible de recibir facturas'
      });

      const storedRfc = await database.rfcs.findByRfc(VALID_RFC);
      expect(storedRfc).to.be.an('object');
      expect(storedRfc.createdAt.getTime()).to.be.closeTo(Date.now(), 1000);
    });
  });
});
