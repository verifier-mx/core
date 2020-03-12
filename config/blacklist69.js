const RFC = 'rfc';
const NAME = 'name';
const RFC_TYPE = 'rfcType';
const LIST_TYPE = 'listType';
const FIRST_PUBLICATION_TYPE = 'firstPublicationType';
const PUBLICATION_TYPE = 'publicationType';
const AMOUNT = 'amount';
const STATE = 'state';
const YEAR = 'year';
const REASON = 'reason';

module.exports = [
  {
    type: 'CANCELADOS',
    link: 'http://omawww.sat.gob.mx/cifras_sat/Documents/Cancelados.csv',
    headers: [RFC, NAME, RFC_TYPE, LIST_TYPE, FIRST_PUBLICATION_TYPE, AMOUNT, PUBLICATION_TYPE, STATE]
  },
  {
    type: 'CONDONADOS_ART_74',
    link: 'http://omawww.sat.gob.mx/cifras_sat/Documents/Condonadosart74CFF.csv',
    headers: [RFC, NAME, RFC_TYPE, LIST_TYPE, FIRST_PUBLICATION_TYPE, AMOUNT, PUBLICATION_TYPE, STATE]
  },
  {
    type: 'CONDONADOS_ART_146B',
    link: 'http://omawww.sat.gob.mx/cifras_sat/Documents/Condonadosart146BCFF.csv',
    headers: [RFC, NAME, RFC_TYPE, LIST_TYPE, FIRST_PUBLICATION_TYPE, AMOUNT, PUBLICATION_TYPE, STATE]
  },
  {
    type: 'CONDONADOS_ART_21',
    link: 'http://omawww.sat.gob.mx/cifras_sat/Documents/Condonadosart21CFF.csv',
    headers: [YEAR, RFC_TYPE, RFC, NAME, AMOUNT, REASON, STATE]
  },
  {
    type: 'CONDONADOS_DECRETO_2015',
    link: 'http://omawww.sat.gob.mx/cifras_sat/Documents/CondonadosporDecreto.csv',
    headers: [RFC, NAME, RFC_TYPE, LIST_TYPE, FIRST_PUBLICATION_TYPE, AMOUNT, PUBLICATION_TYPE, STATE]
  },
  {
    type: 'CONDONADOS_2007_2015',
    link: 'http://omawww.sat.gob.mx/cifras_sat/Documents/Condonados_07_15.csv',
    headers: [YEAR, RFC_TYPE, RFC, NAME, AMOUNT, REASON, STATE]
  },
  {
    type: 'CANCELADOS_2007_2015',
    link: 'http://omawww.sat.gob.mx/cifras_sat/Documents/Cancelados_07_15.csv',
    headers: [YEAR, RFC_TYPE, RFC, NAME, AMOUNT, REASON, STATE]
  },
  {
    type: 'RETORNO_INVERSIONES',
    link: 'http://omawww.sat.gob.mx/cifras_sat/Documents/Retornoinversiones.csv',
    headers: [RFC, NAME, RFC_TYPE, LIST_TYPE, FIRST_PUBLICATION_TYPE, AMOUNT, PUBLICATION_TYPE, STATE]
  },
  {
    type: 'EXIGIBLES',
    link: 'http://omawww.sat.gob.mx/cifras_sat/Documents/Exigibles.csv',
    headers: [RFC, NAME, RFC_TYPE, LIST_TYPE, FIRST_PUBLICATION_TYPE, STATE]
  },
  {
    type: 'FIRMES',
    link: 'http://omawww.sat.gob.mx/cifras_sat/Documents/Firmes.csv',
    headers: [RFC, NAME, RFC_TYPE, LIST_TYPE, FIRST_PUBLICATION_TYPE, STATE]
  },
  {
    type: 'NO_LOCALIZADOS',
    link: 'http://omawww.sat.gob.mx/cifras_sat/Documents/No%20localizados.csv',
    headers: [RFC, NAME, RFC_TYPE, LIST_TYPE, FIRST_PUBLICATION_TYPE, STATE]
  },
  {
    type: 'SENTENCIAS',
    link: 'http://omawww.sat.gob.mx/cifras_sat/Documents/Sentencias.csv',
    headers: [RFC, NAME, RFC_TYPE, LIST_TYPE, FIRST_PUBLICATION_TYPE, STATE]
  },
  {
    type: 'ELIMINADOS_NO_LOCALIZADOS',
    link: 'http://omawww.sat.gob.mx/cifras_sat/Documents/Eliminados.csv',
    headers: [RFC, NAME, RFC_TYPE, LIST_TYPE, FIRST_PUBLICATION_TYPE, REASON]
  }
];
