const pMap = require('p-map');
const {getBlacklist69} = require('../../fetchers/sat');

function updateBlacklist69({database, type, url, headers}) {
  const execute = async () => {
    const latestUpdate = await database.blacklist69.getLatestUpdate(type);
    const data = await getBlacklist69({type, url, headers});
    await storeData(data);
    if (latestUpdate) await database.blacklist69.markOutdatedAsDeleted(type, latestUpdate);
  };

  const storeData = (data) => {
    return pMap(data, (row) => {
      const record = { ...row, deletedAt: null };
      return database.blacklist69.upsert(record).catch(error => {
        console.error('ERROR upserting Blacklist 69 row');
        console.error(row);
        console.error(error);
      });
    }, {concurrency: 100});
  };

  return execute();
}

module.exports = updateBlacklist69;
