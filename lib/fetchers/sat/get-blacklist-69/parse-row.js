const moment = require('moment-timezone');
const validateRfc = require('validate-rfc');

const REASON_REPLACEMENTS = [
  { from: 'art¡culo', to: 'artículo' },
  { from: 'C¢digo', to: 'Código' },
  { from: 'Federaci¢n', to: 'Federación' },
  { from: 'a¤o', to: 'año' },
  { from: 'efectu¢', to: 'efectuó' },
  { from: 'cancelaci¢n', to: 'cancelación' },
  { from: 'Resoluci¢n', to: 'Resolución' },
  { from: 'Miscel nea', to: 'Miscelánea' }
];

const STATE_REPLACEMENTS = {
  'CIUDAD DE MÉXICO': 'CIUDAD DE MEXICO',
  'COAHUILA DE ZARAGOZA': 'COAHUILA',
  'DISTRITO FEDERAL': 'CIUDAD DE MEXICO',
  'ESTADO DE MÉXICO': 'ESTADO DE MEXICO',
  'GUAJAJUATO': 'GUANAJUATO',
  'MEXICO': 'ESTADO DE MEXICO',
  'MICHOACÁN': 'MICHOACAN',
  'MICHOACÁN 1': 'MICHOACAN',
  'MICHOACAN DE OCAMPO': 'MICHOACAN',
  'NUEVO LEÓN': 'NUEVO LEON',
  'SAN LUIS POTOSÍ': 'SAN LUIS POTOSI',
  'TAMPICO': 'TAMAULIPAS',
  'VERACRUZ DE IGNACIO DE LA LLAV': 'VERACRUZ',
  'VERACRUZ DE IGNACIO DE LA LLAVE': 'VERACRUZ',
  'YUCATÁN': 'YUCATAN'
};

const parseDateStr = (dateStr) => dateStr ? moment(dateStr, 'DD/MM/YYYY').tz('America/Mexico_City').toDate() : null;

const parseYearStr = (yearStr) => yearStr ? moment(yearStr, 'YYYY').tz('America/Mexico_City').toDate() : null;

const parseStr = (value) => (value || '').trim() || null;

const parseMoney = (raw) => {
  const value = (parseStr(raw) || '').replace(/[^\d.-]/g, '');
  return value ? Math.round(100 * parseFloat(value)) : null;
};

const parseReason = (value) => {
  const str = parseStr(value);
  if (!str) return str;

  return REASON_REPLACEMENTS.reduce((prev, {from, to}) => prev.replace(from, to), str);
};

const parseState = (value) => {
  const str = parseStr(value);
  if (!str) return str;

  const upcased = str.toUpperCase();
  return STATE_REPLACEMENTS[upcased] || upcased;
};

module.exports = (type, row) => {
  const {rfc, isValid} = validateRfc(row.rfc, { omitVerificationDigit: true });
  if (!isValid) return null;

  return {
    type,
    rfc,
    name: parseStr(row.name),
    firstPublicationDate: parseDateStr(row.firstPublicationDate) || parseYearStr(row.year),
    publicationDate: parseDateStr(row.publicationDate),
    amount: parseMoney(row.amount),
    state: parseState(row.state),
    reason: parseReason(row.reason)
  };
};
