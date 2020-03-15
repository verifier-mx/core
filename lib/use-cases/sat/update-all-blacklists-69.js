const updateBlacklist69 = require('./update-blacklist-69');
const {getBlacklist69Config} = require('../../../config');

module.exports = async ({database}) => {
  return getBlacklist69Config().reduce(async (promise, config) => {
    await promise;
    return updateBlacklist69({database, ...config});
  }, Promise.resolve());
};
