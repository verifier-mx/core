const validateCaptcha = require(`${ROOT_PATH}/lib/fetchers/sat/validate-captcha`);
const {serializeCookies, encodeFormData} = require(`${ROOT_PATH}/lib/fetchers/utils`);
const {mockResponses} = testUtils;

const COOKIES = {
  'JSESSIONID': 'Xe5QQ7DnE4aRkmpnrEeGdXgH9aI6xrWKBsoV2eKeze2bpeO2JR_u!1176736271!1895662390',
  'Sticky-Padron-de-importadores-Contri9080': '185546762.30755.0000',
  'ZNPCQ003-36373300': 'c759e878',
  'F5-PROD-SIAT-AGSC-443': '1800419338.47873.0000'
};
const VIEW_STATE = '7245805761817959768:7927444101954444432';
const CAPTCHA_TEXT = '9ZP2B';
const EXPECTED_DATA = {
  'javax.faces.partial.ajax': 'true',
  'javax.faces.source': 'formMain:j_idt57',
  'javax.faces.partial.execute': '@all',
  'javax.faces.partial.render': 'formMain',
  'formMain:j_idt57': 'formMain:j_idt57',
  'formMain': 'formMain',
  'formMain:captchaInput': CAPTCHA_TEXT,
  'javax.faces.ViewState': VIEW_STATE
};

describe('Fertchers | sat | .validateCaptcha', () => {
  describe('Successful validation', () => {
    beforeEach(() => {
      mockResponses.sat.validateCaptcha.successfulResponse(serializeCookies(COOKIES), encodeFormData(EXPECTED_DATA));
    });

    it('should return true if the captcha is valid', async () => {
      const success = await validateCaptcha(COOKIES, VIEW_STATE, CAPTCHA_TEXT);
      expect(success).to.be.equal(true);
    });
  });

  describe('Failed validation', () => {
    beforeEach(() => {
      mockResponses.sat.validateCaptcha.failedResponse(serializeCookies(COOKIES), encodeFormData(EXPECTED_DATA));
    });

    it('should return false if the captcha is invalid', async () => {
      const success = await validateCaptcha(COOKIES, VIEW_STATE, CAPTCHA_TEXT);
      expect(success).to.be.equal(false);
    });
  });
});
