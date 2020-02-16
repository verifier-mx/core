const fs = require('fs');
const path = require('path');
const nock = require('nock');
const validateCaptcha = require(`${ROOT_PATH}/lib/fetchers/sat/validate-captcha`);
const {serializeCookies, encodeFormData} = require(`${ROOT_PATH}/lib/fetchers/utils`);

const COOKIES = {
  'JSESSIONID': 'LxcM47FBBEatdR3tTJ5HflZyv7M286__tmOoSh2nCiiDmJauuwRs!-1413999414!-1168228153',
  'Sticky-Padron-de-importadores-Contri9080': '185546762.30755.0000',
  'ZNPCQ003-36373300': 'c759e878',
  'F5-PROD-SIAT-AGSC-443': '1800419338.47873.0000'
};
const VIEW_STATE = '7245805761817959768:7927444101954444432';
const SERVICE_URL = 'https://agsc.siat.sat.gob.mx';
const SERVICE_PATH = '/PTSC/ValidaRFC/index.jsf';
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
      const response = requireXml('./successful-response.xml');
      const path = `${SERVICE_PATH};jsessionid=${COOKIES.JSESSIONID}`;
      nock(SERVICE_URL, { encodedQueryParams: true })
        .matchHeader('Cookie', serializeCookies(COOKIES))
        .post(path, encodeFormData(EXPECTED_DATA))
        .reply(200, response);
    });

    it('should return true if the captcha is valid', async () => {
      const success = await validateCaptcha({
        cookies: COOKIES,
        viewState: VIEW_STATE,
        captchaText: CAPTCHA_TEXT
      });
      expect(success).to.be.equal(true);
    });
  });

  describe('Failed validation', () => {
    beforeEach(() => {
      const response = requireXml('./failed-response.xml');
      const path = `${SERVICE_PATH};jsessionid=${COOKIES.JSESSIONID}`;
      nock(SERVICE_URL, { encodedQueryParams: true })
        .matchHeader('Cookie', serializeCookies(COOKIES))
        .post(path, encodeFormData(EXPECTED_DATA))
        .reply(200, response);
    });

    it('should return false if the captcha is invalid', async () => {
      const success = await validateCaptcha({
        cookies: COOKIES,
        viewState: VIEW_STATE,
        captchaText: CAPTCHA_TEXT
      });
      expect(success).to.be.equal(false);
    });
  });
});

function requireXml(file) {
  const filePath = path.join(__dirname, file);
  return fs.readFileSync(filePath);
}
