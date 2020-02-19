const cheerio = require('cheerio');

const SUCCESS_STATUS = 200;
const VALID_RFC_MESSAGE = 'RFC válido, y susceptible de recibir facturas';
const UNREGISTERED_RFC_MESSAGE = 'RFC no registrado en el padrón de contribuyentes';

const getMessage = (data) => {
  const $ = cheerio.load(data);
  return $('.ui-messages-info-summary').text();
};

const calculateResponse = (message) => {
  const response = { message, isValid: null, canInvoice: null };

  switch(message) {
    case VALID_RFC_MESSAGE:
      response.isValid = true;
      response.canInvoice = true;
      break;
    case UNREGISTERED_RFC_MESSAGE:
      response.isValid = false;
      response.canInvoice = false;
      break;
    default:
      throw new Error(`Unknow SAT response to validate RFC: "${message}"`);
  }
  return response;
};

module.exports = (response) => {
  if (response.status !== SUCCESS_STATUS) throw new Error('Invalid HTTP status when verifying RFC');
  const message = getMessage(response.data);
  return calculateResponse(message);
};
