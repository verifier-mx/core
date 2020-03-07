const {getBlacklist69b} = require('../../fetchers/sat');

function updateBlacklist69b({database}) {
  const execute = async () => {
    const latestUpdate = await database.blacklist69b.getLatestUpdate();
    const data = await getBlacklist69b();
    await storeData(data);
    if (latestUpdate) await database.blacklist69b.markOutdatedAsDeleted(latestUpdate);
  };

  const storeData = (data) => {
    const promises = data.map(row => {
      const record = { ...row, deletedAt: null };
      return database.blacklist69b.upsert(record).catch(error => {
        console.error('ERROR upserting Blacklist 69B row');
        console.error(row);
        console.error(error);
      });
    });
    return Promise.all[promises];
  };

  return execute();
}

module.exports = updateBlacklist69b;
