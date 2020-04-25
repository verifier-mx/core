const {detectText} = require('../../fetchers/google-cloud');
const {getCaptcha, getSessionData} = require('../../fetchers/renapo');

const CAPTCHA_ATTEMPTS = 5;

async function solveCaptcha(cookies, viewState, attempts) {
  if (!attempts) throw new Error('Could not solve captcha');

  const captcha = await getCaptcha(cookies);
  const captchaText = await detectText(captcha.content);
  const success = await validateCaptcha(cookies, viewState, captchaText);
  if (!success) return solveCaptcha(cookies, viewState, --attempts);
}

async function fetchCurpStatus({curp}) {
  const {cookies} = await getSessionData();
  console.log(cookies);
  const captcha = await getCaptcha(cookies);
  console.log(captcha.content);
  const captchaText = await detectText(captcha.content);
  return console.log(captchaText);
  //await solveCaptcha(cookies, viewState, CAPTCHA_ATTEMPTS);
  return verifyRfc(cookies, viewState, rfc);
}

module.exports = fetchCurpStatus;

return fetchCurpStatus({curp: ''})
  .then(() => console.log('DONE'))
  .catch(error => console.log('Error', error));
