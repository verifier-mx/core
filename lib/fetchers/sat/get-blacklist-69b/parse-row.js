const moment = require('moment-timezone');
const validateRfc = require('validate-rfc');

const STATUS_MAP = {
  'Definitivo': 'definitive',
  'Desvirtuado': 'detracted',
  'Presunto': 'alleged',
  'Sentencia Favorable': 'favorable'
};
const ES_MONTHS_MAP = {
  'enero': '01',
  'febrero': '02',
  'marzo': '03',
  'abril': '04',
  'mayo': '05',
  'junio': '06',
  'julio': '07',
  'agosto': '08',
  'septiembre': '09',
  'octubre': '10',
  'noviembre': '11',
  'diciembre': '12'
};
const COMMENT_SEPARATOR = ' // ';

const parseOgDetails = (ogDetails) => {
  if (!ogDetails) return {id: null, date: null};
  const [idRaw = '', dateRaw] = ogDetails.split(' de fecha ');
  const id = idRaw.trim() || null;
  const date = parseLongDate(dateRaw.trim());
  return {id, date};
};

const parseLongDate = (dateStr) => {
  if (!dateStr) return null;

  const [dayStr] = dateStr.match(/^\d{1,2}\b/) || [];
  const [monthRaw] = dateStr.match(new RegExp(`\\b(${Object.keys(ES_MONTHS_MAP).join('|')})\\b`)) || [];
  const [yearStr] = dateStr.match(/\b\d{4}$/) || [];

  if (!dayStr || !monthRaw || !yearStr) return null;

  const monthStr = ES_MONTHS_MAP[monthRaw.toLowerCase()];
  return moment(`${dayStr}/${monthStr}/${yearStr}`, 'D/MM/YYYY').tz('America/Mexico_City').toDate();
};

const parseStr = (value) => (value || '').trim() || null;

const parseDateStr = (dateStr) => dateStr ? moment(dateStr, 'DD/MM/YYYY').tz('America/Mexico_City').toDate() : null;

const getStatusDetails = (status, row) => {
  const {id: ogId, date: ogDate} = parseOgDetails(row[`${status}OgDetails`] || row[`${status}OgDetails2`]);
  return {
    [`${status}OgId`]: ogId,
    [`${status}OgPublicationDate`]: ogDate,
    [`${status}SatPublicationDate`]: parseDateStr(row[`${status}SatDateStr`]),
    [`${status}DofPublicationDate`]: parseDateStr(row[`${status}DofDateStr`])
  };
};

const removeComments = (row) => {
  return Object.keys(row).reduce((prev, key) => {
    const hasComment = (row[key] || '').includes(COMMENT_SEPARATOR);
    const value = hasComment ? row[key].split(COMMENT_SEPARATOR)[0] : row[key];
    return Object.assign(prev, { [key]: value });
  }, {});
};

module.exports = (rawRow) => {
  const row = removeComments(rawRow);
  const {rfc, isValid} = validateRfc(row.rfc);
  if (!isValid) return null;

  return {
    rfc,
    blacklistId: row.id,
    name: parseStr(row.name),
    status: STATUS_MAP[row.status],
    ...getStatusDetails('alleged', row),
    ...getStatusDetails('detracted', row),
    ...getStatusDetails('definitive', row),
    ...getStatusDetails('favorable', row)
  };
};
