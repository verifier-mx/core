const cookie = require('cookie');

module.exports = (obj) => {
  return Object.keys(obj)
    .map(key => cookie.serialize(key, obj[key]))
    .join('; ');
};
