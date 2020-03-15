const {DELETED_RFC, OUTDATED_RFC} = require('./constants.json');

const blacklist69 = testUtils.generateFixtures({
  type: 'blacklist69',
  recipe: [
    {
      type: 'CANCELADOS',
      rfc: OUTDATED_RFC,
      createdAt: new Date(0),
      updatedAt: new Date(0),
      deletedAt: undefined
    },
    {
      type: 'CANCELADOS',
      rfc: DELETED_RFC,
      createdAt: new Date(0),
      updatedAt: new Date(0),
      deletedAt: new Date(0)
    }
  ]
});

module.exports = { blacklist69 };
