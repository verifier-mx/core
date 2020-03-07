const {DELETED_RFC, OUTDATED_RFC} = require('./constants.json');

const blacklist69b = testUtils.generateFixtures({
  type: 'blacklist69b',
  recipe: [
    {
      rfc: OUTDATED_RFC,
      createdAt: new Date(0),
      updatedAt: new Date(0),
      deletedAt: undefined
    },
    {
      rfc: DELETED_RFC,
      createdAt: new Date(0),
      updatedAt: new Date(0),
      deletedAt: new Date(0)
    }
  ]
});

module.exports = { blacklist69b };
