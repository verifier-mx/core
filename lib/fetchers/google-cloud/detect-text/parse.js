const {get} = require('lodash');
const SUCCESS_STATUS = 200;

module.exports = (response) => {
  if (response.status !== SUCCESS_STATUS) throw new Error('Invalid HTTP status when detecting text');
  const content = get(response, ['data', 'responses', '0', 'fullTextAnnotation', 'text']);
  return content.replace('\n', '');
};
