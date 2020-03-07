const getBlacklist69b = require(`${ROOT_PATH}/lib/fetchers/sat/get-blacklist-69b`);
const {mockResponses} = testUtils;

const EXPECTED_RESPONSE = [
  {
    rfc: 'AAA080808HL8',
    blacklistId: '1',
    name: 'ASESORES EN AVALUOS Y ACTIVOS, S.A. DE C.V.',
    status: 'favorable',
    allegedOgId: '500-05-2018-16632',
    allegedOgPublicationDate: new Date('2018-06-01T05:00:00.000Z'),
    allegedSatPublicationDate: new Date('2018-06-01T05:00:00.000Z'),
    allegedDofPublicationDate: new Date('2018-06-25T05:00:00.000Z'),
    detractedOgId: null,
    detractedOgPublicationDate: null,
    detractedSatPublicationDate: null,
    detractedDofPublicationDate: null,
    definitiveOgId: '500-05-2018-27105',
    definitiveOgPublicationDate: new Date('2018-09-27T05:00:00.000Z'),
    definitiveSatPublicationDate: new Date('2018-09-28T05:00:00.000Z'),
    definitiveDofPublicationDate: new Date('2018-10-23T05:00:00.000Z'),
    favorableOgId: '500-05-2019-7305',
    favorableOgPublicationDate: new Date('2019-03-05T06:00:00.000Z'),
    favorableSatPublicationDate: new Date('2019-03-05T06:00:00.000Z'),
    favorableDofPublicationDate: new Date('2019-04-16T05:00:00.000Z')
  },
  {
    rfc: 'AAA091014835',
    blacklistId: '2',
    name: 'AQUAERIS ACUACULTURA Y ARQUITECTURA SUSTENTABLE, S.C.',
    status: 'detracted',
    allegedOgId: '500-05-2016-38728',
    allegedOgPublicationDate: new Date('2016-12-16T06:00:00.000Z'),
    allegedSatPublicationDate: new Date('2017-01-01T06:00:00.000Z'),
    allegedDofPublicationDate: new Date('2017-01-19T06:00:00.000Z'),
    detractedOgId: null,
    detractedOgPublicationDate: null,
    detractedSatPublicationDate: null,
    detractedDofPublicationDate: null,
    definitiveOgId: null,
    definitiveOgPublicationDate: null,
    definitiveSatPublicationDate: null,
    definitiveDofPublicationDate: null,
    favorableOgId: null,
    favorableOgPublicationDate: null,
    favorableSatPublicationDate: null,
    favorableDofPublicationDate: null
  },
  {
    rfc: 'ZUMA760304AH6',
    blacklistId: '11110',
    name: 'ZUNIGA MARTINEZ JOSE ASCENCION',
    status: 'definitive',
    allegedOgId: '500-05-2016-36420',
    allegedOgPublicationDate: new Date('2016-09-30T05:00:00.000Z'),
    allegedSatPublicationDate: new Date('2016-10-01T05:00:00.000Z'),
    allegedDofPublicationDate: new Date('2016-10-12T05:00:00.000Z'),
    detractedOgId: null,
    detractedOgPublicationDate: null,
    detractedSatPublicationDate: null,
    detractedDofPublicationDate: null,
    definitiveOgId: '500-05-2017-16004',
    definitiveOgPublicationDate: new Date('2017-04-24T05:00:00.000Z'),
    definitiveSatPublicationDate: new Date('2017-04-24T05:00:00.000Z'),
    definitiveDofPublicationDate: new Date('2017-05-10T05:00:00.000Z'),
    favorableOgId: null,
    favorableOgPublicationDate: null,
    favorableSatPublicationDate: null,
    favorableDofPublicationDate: null
  }
];

describe('Fertchers | sat | .getBlacklist69b', () => {
  beforeEach(mockResponses.sat.getBlacklist69b.successfulResponse);

  it('should return the captcha content', async () => {
    const blacklist = await getBlacklist69b();
    expect(blacklist).to.be.eql(EXPECTED_RESPONSE);
  });
});
