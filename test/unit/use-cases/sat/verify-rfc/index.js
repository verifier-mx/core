const sinon = require('sinon');
const proxyquire = require('proxyquire');
const {VALID_RFC, BLACKLIST_69B_RESPONSE} = require('./constants.json'); 

const upsertRfc = sinon.stub();
const findByRfc = sinon.stub();
const fetchRfcStatus = sinon.stub();
const bl69bFindByRfc = sinon.stub().resolves(BLACKLIST_69B_RESPONSE);
const database = {
  rfcs: { findByRfc, upsert: upsertRfc },
  blacklist69b: { findByRfc: bl69bFindByRfc }
};

const verifyRfc = proxyquire(`${ROOT_PATH}/lib/use-cases/sat/verify-rfc`, {
  './fetch-rfc-status': fetchRfcStatus
});

const SUCCESSFUL_RESPONSE = {
  isValid: true,
  isRegistered: true,
  rfc: VALID_RFC,
  type: 'person',
  satMessage: 'ok',
  blacklist69b: BLACKLIST_69B_RESPONSE
};

describe('Use cases | sat | .verifyRfc', () => {
  const fixtures = require('./fixtures');
  const [RFC_1] = fixtures.rfcs;

  beforeEach(() => {
    upsertRfc.resetHistory();
    findByRfc.resetHistory();
    fetchRfcStatus.resetHistory();
    bl69bFindByRfc.resetHistory();
  });

  describe('When RFC is invalid', () => {
    it('should respond with invalid RFC', async () => {
      const rfc = 'INVALID_RFC';
      const response = await verifyRfc({database, rfc});
      expect(response).to.be.eql({
        isValid: false,
        isRegistered: false,
        rfc: null,
        type: null,
        satMessage: null,
        validationErrors: ['INVALID_FORMAT'],
        blacklist69b: null
      });
    });
  });

  describe('When RFC is cached already', () => {
    beforeEach(() => findByRfc.resolves(RFC_1));

    it('should return data from stored in DB', async () => {
      const response = await verifyRfc({database, rfc: VALID_RFC});
      expect(response).to.be.eql(SUCCESSFUL_RESPONSE);

      expectFindByValidRfc(findByRfc);
      expect(fetchRfcStatus.callCount).to.be.equal(0);
      expect(upsertRfc.callCount).to.be.equal(0);

      expectBlacklist69bCall(VALID_RFC);
    });
  });

  describe('When RFC is not cached', () => {
    const SAT_RESPONSE = { message: 'ok', isValid: true, isRegistered: true };

    beforeEach(() => {
      findByRfc.resolves(null);
      fetchRfcStatus.resolves(SAT_RESPONSE);
      upsertRfc.resolves(RFC_1);
    });

    it('should ask status to SAT and upsert in DB', async () => {
      const response = await verifyRfc({database, rfc: VALID_RFC});
      expect(response).to.be.eql(SUCCESSFUL_RESPONSE);

      expectFindByValidRfc(findByRfc);

      expect(fetchRfcStatus.callCount).to.be.equal(1);
      expect(fetchRfcStatus.firstCall.args).to.be.eql([{rfc: VALID_RFC}]);

      expectBlacklist69bCall(VALID_RFC);

      expect(upsertRfc.callCount).to.be.equal(1);
      expect(upsertRfc.firstCall.args).to.be.eql([{
        isValid: RFC_1.isValid,
        isRegistered: RFC_1.isRegistered,
        rfc: RFC_1.rfc,
        type: RFC_1.type,
        satMessage: RFC_1.satMessage
      }]);
    });
  });
});

function expectFindByValidRfc(stub) {
  const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
  expect(stub.callCount).to.be.equal(1);

  const [actualRfc, actualOptions] = stub.firstCall.args;
  const expectedUpdatedAfterAt = Date.now() - 30 * ONE_DAY_IN_MS;
  expect(actualRfc).to.be.equal(VALID_RFC);
  expect(actualOptions.updatedAfter.getTime()).to.be.closeTo(expectedUpdatedAfterAt, 1000);
}

function expectBlacklist69bCall(rfc) {
  expect(bl69bFindByRfc.callCount).to.be.equal(1);
  expect(bl69bFindByRfc.firstCall.args).to.be.eql([rfc]);
}
