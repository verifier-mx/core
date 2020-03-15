const sinon = require('sinon');
const proxyquire = require('proxyquire');
const {getBlacklist69Config} = require(`${ROOT_PATH}/config`);
const CONFIG = getBlacklist69Config();

const updateBlacklist69 = sinon.stub().resolves();
const database = 'DATABASE';

const updateAllBlacklists69 = proxyquire(`${ROOT_PATH}/lib/use-cases/sat/update-all-blacklists-69`, {
  './update-blacklist-69': updateBlacklist69
});

describe('Use cases | sat | .updateAllBlacklists69', () => {
  beforeEach(updateBlacklist69.resetHistory);

  it('it calls updateBlacklist69 once per configuration available', async () => {
    await updateAllBlacklists69({database});
    expect(updateBlacklist69.callCount).to.be.equal(CONFIG.length);

    const expectedArgs = CONFIG.map(config => [{...config, database}]);
    expect(updateBlacklist69.args).to.be.eql(expectedArgs);
  });
});
