const {pick} = require('lodash');
const rfcFacil = require('rfc-facil');
const verifyRfc = require('./verify-rfc');

const RFC_PARAMS = ['name', 'day', 'month', 'year'];

const builders = {
  company: rfcFacil.forJuristicPerson,
  person: rfcFacil.forNaturalPerson
};

function generateRfc({database, type, ...params}) {
  const builder = builders[type];
  const rfc = builder(getRfcParams(type, params));
  return verifyRfc({database, rfc});
}

function getRfcParams(type, params) {
  const rfcParams = pick(params, RFC_PARAMS);
  if (type === 'company') return rfcParams;

  return Object.assign(rfcParams, {
    firstLastName: params.lastName1,
    secondLastName: params.lastName2
  });
}

module.exports = generateRfc;
