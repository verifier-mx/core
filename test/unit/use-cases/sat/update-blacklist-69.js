const sinon = require('sinon');
const proxyquire = require('proxyquire');

const BL1 = { id: '1' };
const BL2 = { id: '2' };
const CONFIG = {
  type: 'BLACKLIST_TYPE',
  url: 'BLACKLIST_URL',
  headers: ['HEADER_1', 'HEADER_2']
};

const upsert = sinon.stub().resolves();
const getLatestUpdate = sinon.stub().resolves();
const markOutdatedAsDeleted = sinon.stub().resolves();
const getBlacklist69 = sinon.stub().resolves([BL1, BL2]);
const database = { blacklist69: { upsert, getLatestUpdate, markOutdatedAsDeleted } };

const updateBlacklist69 = proxyquire(`${ROOT_PATH}/lib/use-cases/sat/update-blacklist-69`, {
  '../../fetchers/sat': { getBlacklist69 }
});

describe('Use cases | sat | .updateBlacklist69', () => {
  beforeEach(() => {
    upsert.resetHistory();
    getLatestUpdate.resetHistory();
    markOutdatedAsDeleted.resetHistory();
    getBlacklist69.resetHistory();
  });

  describe('When Blacklist69 was empty', () => {
    before(() => {
      getLatestUpdate.resetBehavior();
      getLatestUpdate.resolves(null);
    });

    it('it doesnt mark anything as deleted when list is empty', async () => {
      await updateBlacklist69({database, ...CONFIG});
      expect(getLatestUpdate.callCount).to.be.equal(1);
      expect(getLatestUpdate.firstCall.args).to.be.eql([CONFIG.type]);
      expect(getLatestUpdate.calledBefore(getBlacklist69)).to.be.equal(true);
      expect(getLatestUpdate.calledBefore(upsert)).to.be.equal(true);
      expect(markOutdatedAsDeleted.callCount).to.be.equal(0);
    });

    it('it upserts data and sets "deletedAt" to null', async () => {
      await updateBlacklist69({database, ...CONFIG});
      expect(getBlacklist69.callCount).to.be.equal(1);
      expect(getBlacklist69.firstCall.args).to.be.eql([CONFIG]);
      expect(upsert.callCount).to.be.equal(2);
      expect(upsert.args).to.be.eql([
        [ { ...BL1, deletedAt: null } ],
        [ { ...BL2, deletedAt: null } ]
      ]);
    });
  });

  describe('When Blacklist69 has data before', () => {
    const LATEST_UPDATE = new Date(5000);

    before(() => {
      getLatestUpdate.resetBehavior();
      getLatestUpdate.resolves(LATEST_UPDATE);
    });

    it('it should mark oudated records as deleted', async () => {
      await updateBlacklist69({database, ...CONFIG});
      expect(getLatestUpdate.callCount).to.be.equal(1);
      expect(getLatestUpdate.calledBefore(getBlacklist69)).to.be.equal(true);
      expect(getLatestUpdate.calledBefore(upsert)).to.be.equal(true);
      expect(getLatestUpdate.calledBefore(markOutdatedAsDeleted)).to.be.equal(true);
      expect(markOutdatedAsDeleted.callCount).to.be.equal(1);
      expect(markOutdatedAsDeleted.firstCall.args).to.be.eql([CONFIG.type, LATEST_UPDATE]);
    });
  });
});
