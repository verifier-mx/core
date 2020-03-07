const {compact} = require('lodash');
const axios = require('axios');
const csv = require('csv-parser');
const iconv = require('iconv-lite');

const SUCCESS_STATUS = 200;
const URL = 'http://omawww.sat.gob.mx/cifras_sat/Documents/Listado_Completo_69-B.csv';
const CSV_HEADERS = [
  'id', 'rfc', 'name', 'status',
  'allegedOgDetails', 'allegedSatDateStr', 'allegedOgDetails2', 'allegedDofDateStr',
  'detractionSatDateStr', 'detractionOgDetails', 'detractionDofDateStr',
  'definitiveOgDetails', 'definitiveSatDateStr', 'definitiveDofDateStr',
  'favorableOgDetails', 'favorableSatDateStr', 'favorableOgDetails2', 'favorableDofDateStr'
];

module.exports = (parseRow) => {
  const url = URL;
  const method = 'get';
  const responseType = 'stream';
  const csvOptions = {
    skipLines: 2,
    mapHeaders: ({ index }) => CSV_HEADERS[index] || index
  };
  return axios({ url, method, responseType })
    .then(({status, data}) => new Promise((resolve, reject) => {
      if (status !== SUCCESS_STATUS) throw new Error('Invalid HTTP status when downloading SAT blacklist');
      const results = [];
      return data
        .pipe(iconv.decodeStream('iso-8859-1'))
        .pipe(iconv.encodeStream('utf8'))
        .pipe(csv(csvOptions))
        .on('error', reject)
        .on('data', (data) => results.push(parseRow(data)))
        .on('end', () => resolve(compact(results)));
    }));
};
