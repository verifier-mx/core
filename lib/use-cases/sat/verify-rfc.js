const {pick} = require('lodash');
const validateRfc = require('validate-rfc');
const fetchRfcStatus = require('./fetch-rfc-status');
const {getRfcCacheTTL} = require('../../../config');

const RETURNED_PROPERTIES = ['isValid', 'isRegistered', 'rfc', 'type', 'satMessage'];

function verifyRfc({database, rfc: inputRfc}) {
  const execute = async () => {
    const {isValid, rfc, type, errors} = validateRfc(inputRfc);
    if (!isValid) return returnInvalidResponse(errors);

    const rfcObj = await getRfcObj(rfc, type);
    const blacklist69 = await database.blacklist69.findByRfc(rfc);
    const blacklist69b = await database.blacklist69b.findByRfc(rfc);
    return { ...rfcObj, blacklist69, blacklist69b };
  };

  const getRfcObj = async (rfc, type) => {
    const updatedAfter = getUpdatedAfter();
    const cachedRfc = await database.rfcs.findByRfc(rfc, { updatedAfter });
    if (cachedRfc) return parseRfcObj(cachedRfc);

    const satStatus = await fetchRfcStatus({rfc});
    const storedRfc = await storeRfc(rfc, type, satStatus);
    return parseRfcObj(storedRfc);
  };

  const returnInvalidResponse = (errors) => ({
    isValid: false,
    isRegistered: false,
    rfc: null,
    type: null,
    satMessage: null,
    blacklist69: [],
    blacklist69b: null,
    validationErrors: errors
  });

  const getUpdatedAfter = () => new Date(Date.now() - getRfcCacheTTL());

  const parseRfcObj = (rfcObj) => pick(rfcObj, RETURNED_PROPERTIES);

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
