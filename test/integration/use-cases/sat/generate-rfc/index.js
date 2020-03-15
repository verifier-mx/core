const generateRfc = require(`${ROOT_PATH}/lib/use-cases/sat/generate-rfc`);
const database = require('verifier-database');
const {COMPANY_RFC, PERSON_RFC} = require('./constants.json');
const {resetDatabase, insertFixtures} = testUtils;

const RESPONSE_TEMPLATE = {
  isValid: true,
  isRegistered: true,
  rfc: null,
  type: null,
  satMessage: 'ok',
  blacklist69: [],
  blacklist69b: null
};

const COMPANY_DATA = {
  type: 'company',
  name: 'RETWEETI',
  day: 5,
  month: 7,
  year: 2013
};

const PERSON_DATA = {
  type: 'person',
  name: 'Manuel Honorio',
  lastName1: 'de la Torre',
  lastName2: 'Ramírez',
  day: 10,
  month: 10,
  year: 1990
};

describe('Use cases | sat | .generateRfc', () => {
  const fixtures = require('./fixtures');

  before(async () => {
    await resetDatabase();
    await insertFixtures(fixtures);
  });

  describe('RFC for a company', () => {
    it('generates a RFC and verifies it', async () => {
      const response = await generateRfc({database, ...COMPANY_DATA});
      expect(response).to.be.eql({...RESPONSE_TEMPLATE, rfc: COMPANY_RFC, type: 'company'});
    });
  });

  describe('RFC for a person', () => {
    it('generates a RFC and verifies it', async () => {
      const response = await generateRfc({database, ...PERSON_DATA});
      expect(response).to.be.eql({...RESPONSE_TEMPLATE, rfc: PERSON_RFC, type: 'person'});
    });
  });
});
