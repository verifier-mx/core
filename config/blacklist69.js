const RFC = 'rfc';
const NAME = 'name';
const RFC_TYPE = 'rfcType';
const LIST_TYPE = 'listType';
const FIRST_PUBLICATION_DATE = 'firstPublicationDate';
const PUBLICATION_DATE = 'publicationDate';
const AMOUNT = 'amount';
const STATE = 'state';
const YEAR = 'year';
const REASON = 'reason';

module.exports = [
  {
    type: 'CANCELADOS',
    url: 'http://omawww.sat.gob.mx/cifras_sat/Documents/Cancelados.csv',
    headers: [RFC, NAME, RFC_TYPE, LIST_TYPE, FIRST_PUBLICATION_DATE, AMOUNT, PUBLICATION_DATE, STATE]
  },
  {
    type: 'CONDONADOS_ART_74',
    url: 'http://omawww.sat.gob.mx/cifras_sat/Documents/Condonadosart74CFF.csv',
    headers: [RFC, NAME, RFC_TYPE, LIST_TYPE, FIRST_PUBLICATION_DATE, AMOUNT, PUBLICATION_DATE, STATE]
  },
  {
    type: 'CONDONADOS_ART_146B',
    url: 'http://omawww.sat.gob.mx/cifras_sat/Documents/Condonadosart146BCFF.csv',
    headers: [RFC, NAME, RFC_TYPE, LIST_TYPE, FIRST_PUBLICATION_DATE, AMOUNT, PUBLICATION_DATE, STATE]
  },
  {
    type: 'CONDONADOS_ART_21',
    url: 'http://omawww.sat.gob.mx/cifras_sat/Documents/Condonadosart21CFF.csv',
    headers: [RFC, NAME, RFC_TYPE, LIST_TYPE, FIRST_PUBLICATION_DATE, AMOUNT, PUBLICATION_DATE, STATE]
  },
  {
    type: 'CONDONADOS_DECRETO_2015',
    url: 'http://omawww.sat.gob.mx/cifras_sat/Documents/CondonadosporDecreto.csv',
    headers: [RFC, NAME, RFC_TYPE, LIST_TYPE, FIRST_PUBLICATION_DATE, AMOUNT, PUBLICATION_DATE, STATE]
  },
  {
    type: 'CONDONADOS_2007_2015',
    url: 'http://omawww.sat.gob.mx/cifras_sat/Documents/Condonados_07_15.csv',
    headers: [YEAR, RFC_TYPE, RFC, NAME, AMOUNT, REASON, STATE]
  },
  {
    type: 'CANCELADOS_2007_2015',
    url: 'http://omawww.sat.gob.mx/cifras_sat/Documents/Cancelados_07_15.csv',
    headers: [YEAR, RFC_TYPE, RFC, NAME, AMOUNT, REASON, STATE]
  },
  {
    type: 'RETORNO_INVERSIONES',
    url: 'http://omawww.sat.gob.mx/cifras_sat/Documents/Retornoinversiones.csv',
    headers: [RFC, NAME, RFC_TYPE, LIST_TYPE, FIRST_PUBLICATION_DATE, AMOUNT, PUBLICATION_DATE, STATE]
  },
  {
    type: 'EXIGIBLES',
    url: 'http://omawww.sat.gob.mx/cifras_sat/Documents/Exigibles.csv',
    headers: [RFC, NAME, RFC_TYPE, LIST_TYPE, FIRST_PUBLICATION_DATE, STATE]
  },
  {
    type: 'FIRMES',
    url: 'http://omawww.sat.gob.mx/cifras_sat/Documents/Firmes.csv',
    headers: [RFC, NAME, RFC_TYPE, LIST_TYPE, FIRST_PUBLICATION_DATE, STATE]
  },
  {
    type: 'NO_LOCALIZADOS',
    url: 'http://omawww.sat.gob.mx/cifras_sat/Documents/No%20localizados.csv',
    headers: [RFC, NAME, RFC_TYPE, LIST_TYPE, FIRST_PUBLICATION_DATE, STATE]
  },
  {
    type: 'SENTENCIAS',
    url: 'http://omawww.sat.gob.mx/cifras_sat/Documents/Sentencias.csv',
    headers: [RFC, NAME, RFC_TYPE, LIST_TYPE, FIRST_PUBLICATION_DATE, STATE]
  },
  {
    type: 'ELIMINADOS_NO_LOCALIZADOS',
    url: 'http://omawww.sat.gob.mx/cifras_sat/Documents/Eliminados.csv',
    headers: [RFC, NAME, RFC_TYPE, LIST_TYPE, FIRST_PUBLICATION_DATE, REASON]
  }
];
