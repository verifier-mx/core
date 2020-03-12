const moment = require('moment-timezone');
const validateRfc = require('validate-rfc');

const parseDateStr = (dateStr) => dateStr ? moment(dateStr, 'DD/MM/YYYY').tz('America/Mexico_City').toDate() : null;

const parseYearStr = (yearStr) => yearStr ? moment(yearStr, 'YYYY').tz('America/Mexico_City').toDate() : null;

const parseStr = (value) => (value || '').trim() || null;

const parseMoney = (raw) => {
  const value = (parseStr(raw) || '').replace(/[^\d.-]/g, '');
  return value ? Math.round(100 * parseFloat(value)) : null;
};

module.exports = (type, row) => {
  const {rfc, isValid} = validateRfc(row.rfc);
  if (!isValid) return null;

  return {
    type,
    rfc,
    name: parseStr(row.name),
    firstPublicationType: parseDateStr(row.firstPublicationType) || parseYearStr(row.year),
    publicationType: parseDateStr(row.publicationType),
    amount: parseMoney(row.amount),
    state: parseStr(row.state),
    reason: parseStr(row.reason)
  };
};
