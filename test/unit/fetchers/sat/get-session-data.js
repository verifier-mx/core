const getSessionData = require(`${ROOT_PATH}/lib/fetchers/sat/get-session-data`);
const {mockResponses} = testUtils;

const EXPECTED_RESPONSE = {
  cookies: {
    'JSESSIONID': 'Xe5QQ7DnE4aRkmpnrEeGdXgH9aI6xrWKBsoV2eKeze2bpeO2JR_u!1176736271!1895662390',
    'Sticky-Padron-de-importadores-Contri9080': '185546762.30755.0000',
    'ZNPCQ003-36373300': 'c759e878',
    'F5-PROD-SIAT-AGSC-443': '1800419338.47873.0000'
  },
  viewState: '-4798378679272502056:8767500030069814135'
};

describe('Fertchers | sat | .getSessionData', () => {
  beforeEach(() => {
    mockResponses.sat.getSessionData.successfulResponse();
  });

  it('should return a session id', async () => {
    const session = await getSessionData();
    expect(session).to.eql(EXPECTED_RESPONSE);
  });
});
