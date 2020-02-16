require('./load');
const {env} = process;

module.exports = {
  getGoogleCloudApiKey: () => env.GOOGLE_CLOUD_API_KEY
};
