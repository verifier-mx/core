const {detectText} = require('../../../fetchers/google-cloud');
const {getCaptcha, getSessionData, validateCaptcha, verifyRfc} = require('../../../fetchers/sat');

const CAPTCHA_ATTEMPTS = 5;

async function solveCaptcha(cookies, viewState, attempts) {
  if (!attempts) throw new Error('Could not solve captcha');

  const captcha = await getCaptcha(cookies);
  const captchaText = await detectText(captcha.content);
  const success = await validateCaptcha(cookies, viewState, captchaText);
  if (!success) return solveCaptcha(cookies, viewState, --attempts);
}

async function validateRfc(rfc) {
  const session = await getSessionData();
  const {cookies, viewState} = session;
  await solveCaptcha(cookies, viewState, CAPTCHA_ATTEMPTS);
  return verifyRfc(cookies, viewState, rfc);
}

module.exports = validateRfc;
