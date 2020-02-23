const {pick} = require('lodash');
const validateRfc = require('validate-rfc');
const fetchRfcStatus = require('./fetch-rfc-status');
const {getRfcCacheTTL} = require('../../../config');

const RETURNED_PROPERTIES = ['isValid', 'isRegistered', 'rfc', 'type', 'satMessage'];

function verifyRfc({database, rfc: inputRfc}) {
  const execute = async () => {
    const {isValid, rfc, type, errors} = validateRfc(inputRfc);
    if (!isValid) return returnInvalidResponse(errors);

    const updatedAfter = getUpdatedAfter();
    const cachedRfc = await database.rfcs.findByRfc(rfc, { updatedAfter });
    if (cachedRfc) return returnStoredRfc(cachedRfc);

    const satStatus = await fetchRfcStatus({rfc});
    const storedRfc = await storeRfc(rfc, type, satStatus);
    return returnStoredRfc(storedRfc);
  };

  const returnInvalidResponse = (errors) => ({
    isValid: false,
    isRegistered: false,
    rfc: null,
    type: null,
    satMessage: null,
    validationErrors: errors
  });

  const getUpdatedAfter = () => new Date(Date.now() - getRfcCacheTTL());

  const returnStoredRfc = (rfcObj) => pick(rfcObj, RETURNED_PROPERTIES);

  const storeRfc = (rfc, type, satStatus) => {
    const data = {
      rfc,
      type,
      isValid: satStatus.isValid,
      isRegistered: satStatus.isRegistered,
      satMessage: satStatus.message
    };
    return database.rfcs.upsert(data);
  };

  return execute();
}

module.exports = verifyRfc;
