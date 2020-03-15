const updateBlacklist69 = require(`${ROOT_PATH}/lib/use-cases/sat/update-blacklist-69`);
const {getBlacklist69Config} = require(`${ROOT_PATH}/config`);
const database = require('verifier-database');
const {DELETED_RFC, OUTDATED_RFC} = require('./constants.json');
const {mockResponses, resetDatabase, insertFixtures} = testUtils;

const EXPECTED_UPDATED_RFCS = ['&ME060209E41', '&ML040319NR4', '&RM040614KE0'];
const TYPE = 'CANCELADOS';
const [CONFIG] = getBlacklist69Config().filter(({type}) => type === TYPE);

describe('Use cases | sat | .updateBlacklist69', () => {
  const fixtures = require('./fixtures');

  describe('Successful execution', () => {
    before(async () => {
      await resetDatabase();
      await insertFixtures(fixtures);

      mockResponses.sat.getBlacklist69.successfulResponse(TYPE);

      await updateBlacklist69({database, ...CONFIG});
    });

    it('should fetch blacklist69 and update it', async () => {
      const records = (await database.blacklist69.find()).filter(r => EXPECTED_UPDATED_RFCS.includes(r.rfc));
      expect(records.length).to.be.equal(EXPECTED_UPDATED_RFCS.length);
      records.forEach(expectUpdatedRecord);
    });

    it('should mark remove "deletedAt" flag when record is updated', async () => {
      const [record] = await database.blacklist69.find({rfc: DELETED_RFC});
      expectUpdatedRecord(record);
    });

    it('should mark non updated record as deleted', async () => {
      const [record] = await database.blacklist69.find({rfc: OUTDATED_RFC});
      expect(record.updatedAt.getTime()).to.be.equal(0);
      expect(record.deletedAt.getTime()).to.be.closeTo(Date.now(), 1000);
    });
  });
});

function expectUpdatedRecord(item) {
  expect(item.updatedAt.getTime()).to.be.closeTo(Date.now(), 1000);
  expect(item.deletedAt).to.be.equal(null);
}
