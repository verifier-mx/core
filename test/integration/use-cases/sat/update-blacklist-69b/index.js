const updateBlacklist69b = require(`${ROOT_PATH}/lib/use-cases/sat/update-blacklist-69b`);
const database = require('verifier-database');
const {DELETED_RFC, OUTDATED_RFC} = require('./constants.json');
const {mockResponses, resetDatabase, insertFixtures} = testUtils;

const EXPECTED_UPDATED_RFCS = ['AAA080808HL8', 'AAA091014835', 'ZUMA760304AH6'];

describe('Use cases | sat | .updateBlacklist69b', () => {
  const fixtures = require('./fixtures');

  describe('Successful execution', () => {
    before(async () => {
      await resetDatabase();
      await insertFixtures(fixtures);

      mockResponses.sat.getBlacklist69b.successfulResponse();

      await updateBlacklist69b({database});
    });

    it('should fetch blacklist69b and update it', async () => {
      const records = (await database.blacklist69b.find()).filter(r => EXPECTED_UPDATED_RFCS.includes(r.rfc));
      expect(records.length).to.be.equal(EXPECTED_UPDATED_RFCS.length);
      records.forEach(expectUpdatedRecord);
    });

    it('should mark remove "deletedAt" flag when record is updated', async () => {
      const [record] = await database.blacklist69b.find({rfc: DELETED_RFC});
      expectUpdatedRecord(record);
    });

    it('should mark non updated record as deleted', async () => {
      const [record] = await database.blacklist69b.find({rfc: OUTDATED_RFC});
      expect(record.updatedAt.getTime()).to.be.equal(0);
      expect(record.deletedAt.getTime()).to.be.closeTo(Date.now(), 1000);
    });
  });
});

function expectUpdatedRecord(item) {
  expect(item.updatedAt.getTime()).to.be.closeTo(Date.now(), 1000);
  expect(item.deletedAt).to.be.equal(null);
}
