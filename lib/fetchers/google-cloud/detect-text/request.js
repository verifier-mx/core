const axios = require('axios');
const URL = 'https://vision.googleapis.com/v1/images:annotate';
const TEXT_DETECTION_TAG = 'TEXT_DETECTION';

const buildHeaders = () => ({
  'Content-Type': 'application/json; charset=utf-8'
});

const buildData = (content) => ({
  requests: [
    {
      features: [{ type: TEXT_DETECTION_TAG }],
      image: { content }
    }
  ]
});

module.exports = (apiKey, imageContent) => axios({
  method: 'POST',
  url: URL,
  headers: buildHeaders(apiKey),
  data: buildData(imageContent),
  params: { key: apiKey }
});
