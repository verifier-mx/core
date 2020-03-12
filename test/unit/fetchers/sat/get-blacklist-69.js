const {getBlacklist69Config} = require(`${ROOT_PATH}/config`);
const getBlacklist69 = require(`${ROOT_PATH}/lib/fetchers/sat/get-blacklist-69`);
const {mockResponses} = testUtils;

const EXPECTED_RESPONSE = {
  CANCELADOS: [
    {
      type: 'CANCELADOS',
      rfc: '&ME060209E41',
      name: 'Y & Y MEXICO SA DE CV',
      firstPublicationType: new Date('2015-11-01T06:00:00.000Z'),
      publicationType: null,
      amount: null,
      state: 'MEXICO',
      reason: null
    },
    {
      type: 'CANCELADOS',
      rfc: '&ML040319NR4',
      name: 'E & M LOGISTIC SERVICE  SA DE CV',
      firstPublicationType: new Date('2018-02-16T06:00:00.000Z'),
      publicationType: new Date('2018-02-16T06:00:00.000Z'),
      amount: 308000,
      state: 'CHIAPAS',
      reason: null
    },
    {
      type: 'CANCELADOS',
      rfc: '&RM040614KE0',
      name: 'A & R DE MEXICO .925 SA DE CV',
      firstPublicationType: new Date('2014-12-01T06:00:00.000Z'),
      publicationType: null,
      amount: null,
      state: 'GUERRERO',
      reason: null
    }
  ],
  CONDONADOS_2007_2015: [
    {
      type: 'CONDONADOS_2007_2015',
      rfc: 'AAA390128530',
      name: 'ASOCIACION DE AGENTES ADUANALES DE NUEVO LAREDO AC',
      firstPublicationType: new Date('2007-01-01T06:00:00.000Z'),
      publicationType: null,
      amount: 1169183300,
      state: 'TAMAULIPAS',
      reason: 'Por cumplir con los requisitos previstos en el art¡culo 7mo transitorio de la Ley de Ingresos de la Federaci¢n para el ejercicio Fiscal de 2007'
    },
    {
      type: 'CONDONADOS_2007_2015',
      rfc: 'AAA870910JNA',
      name: 'ALARCON AGUILAR Y AUDITORES SC',
      firstPublicationType: new Date('2008-01-01T06:00:00.000Z'),
      publicationType: null,
      amount: 198347700,
      state: 'BAJA CALIFORNIA SUR',
      reason: 'Por cumplir con los requisitos previstos en el art¡culo 74 del C¢digo Fiscal de la Federaci¢n y las reglas de la Resoluci¢n Miscel nea Fiscal'
    },
    {
      type: 'CONDONADOS_2007_2015',
      rfc: 'AAA880801SR2',
      name: 'ASESORES Y ACTUARIOS AGENTES DE SEGUROS SA DE CV',
      firstPublicationType: new Date('2008-01-01T06:00:00.000Z'),
      publicationType: null,
      amount: 457349900,
      state: 'CIUDAD DE MEXICO',
      reason: 'Por cumplir con los requisitos previstos en el art¡culo 74 del C¢digo Fiscal de la Federaci¢n y las reglas de la Resoluci¢n Miscel nea Fiscal'
    }
  ]
};

describe('Fertchers | sat | .getBlacklist69', () => {
  describe('For blacklist type "CANCELADOS"', () => {
    beforeEach(() => mockResponses.sat.getBlacklist69.successfulResponse('CANCELADOS'));

    it('should return the 69 blacklist for "CANCELADOS"', async () => {
      const [params] = getBlacklist69Config().filter(({type}) => type === 'CANCELADOS');
      const blacklist = await getBlacklist69(params);
      expect(blacklist).to.be.eql(EXPECTED_RESPONSE.CANCELADOS);
    });
  });

  describe('For blacklist type "CONDONADOS_2007_2015"', () => {
    beforeEach(() => mockResponses.sat.getBlacklist69.successfulResponse('CONDONADOS_2007_2015'));

    it('should return the 69 blacklist for "CANCELADOS"', async () => {
      const [params] = getBlacklist69Config().filter(({type}) => type === 'CONDONADOS_2007_2015');
      const blacklist = await getBlacklist69(params);
      expect(blacklist).to.be.eql(EXPECTED_RESPONSE.CONDONADOS_2007_2015);
    });
  });
});
