const nock = require('nock');
const detectText = require(`${ROOT_PATH}/lib/fetchers/google-cloud/detect-text`);
const sampleImage = require('./sample-image.json').base64;
const sampleResponse = require('./sample-response.json');
const {getGoogleCloudApiKey} = require(`${ROOT_PATH}/config`);

const EXPECTED_TEXT = '9WW4S';
const SERVICE_URL = 'https://vision.googleapis.com';
const SERVICE_PATH = '/v1/images:annotate';

describe('Fertchers | google cloud | .detectText', () => {
  beforeEach(() => {
    nock(SERVICE_URL, { encodedQueryParams: true })
      .post(SERVICE_PATH)
      .query({ key: getGoogleCloudApiKey() })
      .reply(
        sampleResponse.status,
        sampleResponse.data,
        sampleResponse.headers
      );
  });

  it('should detect text in an image', async () => {
    const text = await detectText(sampleImage);
    expect(text).to.be.equal(EXPECTED_TEXT);
  });
});
