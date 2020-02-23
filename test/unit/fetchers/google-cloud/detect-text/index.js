const detectText = require(`${ROOT_PATH}/lib/fetchers/google-cloud/detect-text`);
const sampleImage = require('./sample-image.json').base64;
const {getGoogleCloudApiKey} = require(`${ROOT_PATH}/config`);
const {mockResponses} = testUtils;

const EXPECTED_TEXT = '9WW4S';

describe('Fertchers | google cloud | .detectText', () => {
  beforeEach(() => {
    mockResponses.googleCloud.textDetection.successfulResponse(getGoogleCloudApiKey());
  });

  it('should detect text in an image', async () => {
    const text = await detectText(sampleImage);
    expect(text).to.be.equal(EXPECTED_TEXT);
  });
});
