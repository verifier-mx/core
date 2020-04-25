const getSessionData = require(`${ROOT_PATH}/lib/fetchers/renapo/get-session-data`);
const {mockResponses} = testUtils;

const EXPECTED_RESPONSE = {
  cookies: {
    'JSESSIONID': '8iv2BgLAR0fhmfP5ItjqhyoCdOOXiyi280YrcfmOAeGLFcrIPL0T!-2130090450',
    'BIGipServerPS_Consultas_Curp_Portales_APF_80': '!OnILlTMUsg0wtvKd01GHwwm/qjG7G87XKV1sZqL2xX/sVhqiljE2hWEZTZU/JgN3x06uwOj3EXk+lw=='
  }
};

describe('Fertchers | renapo | .getSessionData', () => {
  beforeEach(() => {
    mockResponses.renapo.getSessionData.successfulResponse();
  });

  it('should return the session data', async () => {
    const session = await getSessionData();
    expect(session).to.eql(EXPECTED_RESPONSE);
  });
});
