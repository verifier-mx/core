const cheerio = require('cheerio');

const SUCCESS_STATUS = 200;

const isSucessfulResponse = ($) => {
  const containerId = 'formMain\\:j_idt69';
  const expectedContent = 'RFC del contribuyente';
  return $(`#${containerId}`).text() === expectedContent;
};

const isErrorResponse = ($) => {
  const containerClass = 'ui-messages-error-summary';
  const expectedContent = 'El código que escribió no es correcto, inténtelo nuevamente';
  return $(`.${containerClass}`).text() === expectedContent;
};

const getSuccessValue = (data) => {
  const $ = cheerio.load(data);
  if (isSucessfulResponse($)) return true;
  if (isErrorResponse($)) return false;
  return null;
};

module.exports = (response) => {
  if (response.status !== SUCCESS_STATUS) throw new Error('Invalid HTTP status when requesting captcha');
  return getSuccessValue(response.data);
};
