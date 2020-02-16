const nock = require('nock');
const getSessionData = require(`${ROOT_PATH}/lib/fetchers/sat/get-session-data`);
const sampleResponse = require('./sample-response.json');

const SERVICE_URL = 'https://agsc.siat.sat.gob.mx';
const SERVICE_PATH = '/PTSC/ValidaRFC/index.jsf';
const EXPECTED_RESPONSE = {
  cookies: {
    'JSESSIONID': 'ZAsMvnMVXN4t4soI_TghYZv-VZRS0NjU_Sc_iCH455LKfqvJAWCK!738860326!-1115452840',
    'Sticky-Padron-de-importadores-Contri9080': '135215114.30755.0000',
    'ZNPCQ003-36373300': 'c759e878',
    'F5-PROD-SIAT-AGSC-443': '1800419338.47873.0000'
  },
  viewState: '-5383031365891792437:1833193553809043278'
};

describe('Fertchers | sat | .getSessionData', () => {
  beforeEach(() => {
    nock(SERVICE_URL, { encodedQueryParams: true })
      .get(SERVICE_PATH)
      .reply(
        sampleResponse.status,
        sampleResponse.data,
        sampleResponse.headers
      );
  });

  it('should return a session id', async () => {
    const session = await getSessionData();
    expect(session).to.eql(EXPECTED_RESPONSE);
  });
});
