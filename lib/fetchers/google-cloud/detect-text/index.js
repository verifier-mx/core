const request = require('./request');
const parse = require('./parse');
const {getGoogleCloudApiKey} = require('../../../../config');

function detectText(imageContent) {
  const apiKey = getGoogleCloudApiKey();
  return request(apiKey, imageContent)
    .then(parse);
}

module.exports = detectText;
