const {compact} = require('lodash');
const axios = require('axios');
const csv = require('csv-parser');
const iconv = require('iconv-lite');

const SUCCESS_STATUS = 200;

module.exports = (parseRow, {type, url, headers}) => {
  const method = 'get';
  const responseType = 'stream';
  const csvOptions = {
    skipLines: 0,
    mapHeaders: ({ index }) => headers[index] || index
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
        .on('data', (data) => results.push(parseRow(type, data)))
        .on('end', () => resolve(compact(results)));
    }));
};
