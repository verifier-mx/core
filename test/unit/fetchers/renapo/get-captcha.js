const getCaptcha = require(`${ROOT_PATH}/lib/fetchers/sat/get-captcha`);
const {serializeCookies} = require(`${ROOT_PATH}/lib/fetchers/utils`);
const {mockResponses} = testUtils;

const COOKIES = {
  'JSESSIONID': 'Xe5QQ7DnE4aRkmpnrEeGdXgH9aI6xrWKBsoV2eKeze2bpeO2JR_u!1176736271!1895662390',
  'Sticky-Padron-de-importadores-Contri9080': '185546762.30755.0000',
  'ZNPCQ003-36373300': 'c759e878',
  'F5-PROD-SIAT-AGSC-443': '1800419338.47873.0000'
};
const EXPECTED_RESPONSE = {
  cookies: {
    'Sticky-Padron-de-importadores-Contri9080': '168769546.30755.0000',
    'F5-PROD-SIAT-AGSC-443': '1800419338.47873.0000'
  },
  content: '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'
};

describe('Fertchers | sat | .getCaptcha', () => {
  beforeEach(() => {
    mockResponses.sat.getCaptcha.successfulResponse(serializeCookies(COOKIES));
  });

  it('should return the captcha content', async () => {
    const captcha = await getCaptcha(COOKIES);
    expect(captcha).to.be.eql(EXPECTED_RESPONSE);
  });
});
