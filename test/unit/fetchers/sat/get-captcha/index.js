const nock = require('nock');
const getCaptcha = require(`${ROOT_PATH}/lib/fetchers/sat/get-captcha`);
const sampleResponse = require('./sample-response.json');
const {serializeCookies} = require(`${ROOT_PATH}/lib/fetchers/utils`);

const COOKIES = {
  'JSESSIONID': 'Xe5QQ7DnE4aRkmpnrEeGdXgH9aI6xrWKBsoV2eKeze2bpeO2JR_u!1176736271!1895662390',
  'Sticky-Padron-de-importadores-Contri9080': '185546762.30755.0000',
  'ZNPCQ003-36373300': 'c759e878',
  'F5-PROD-SIAT-AGSC-443': '1800419338.47873.0000'
};
const SERVICE_URL = 'https://agsc.siat.sat.gob.mx';
const SERVICE_PATH = '/PTSC/ValidaRFC/captchaReload';
const EXPECTED_RESPONSE = {
  cookies: {
    'Sticky-Padron-de-importadores-Contri9080': '168769546.30755.0000',
    'F5-PROD-SIAT-AGSC-443': '1800419338.47873.0000'
  },
  content: sampleResponse.data
};

describe('Fertchers | sat | .getCaptcha', () => {
  beforeEach(() => {
    nock(SERVICE_URL, { encodedQueryParams: true })
      .matchHeader('Cookie', serializeCookies(COOKIES))
      .post(SERVICE_PATH)
      .reply(
        sampleResponse.status,
        sampleResponse.data,
        sampleResponse.headers
      );
  });

  it('should return the captcha content', async () => {
    const captcha = await getCaptcha(COOKIES);
    expect(captcha).to.be.eql(EXPECTED_RESPONSE);
  });
});
