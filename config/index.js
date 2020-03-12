const {env} = process;
const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const RFC_CACHE_TTL = 30 * ONE_DAY_IN_MS;

module.exports = {
  getGoogleCloudApiKey: () => env.GOOGLE_CLOUD_API_KEY,
  getRfcCacheTTL: () => RFC_CACHE_TTL,
  getBlacklist69Config: () => require('./blacklist69')
};
