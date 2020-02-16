const {detectText} = require('../../../fetchers/google-cloud');
const {getCaptcha, getSessionData, validateCaptcha} = require('../../../fetchers/sat');

async function validateRfc(rfc) {
  let cookies = {};
  const session = await getSessionData();
  const {viewState} = session;
  cookies = { ...cookies, ...session.cookies };
  const captcha = await getCaptcha(cookies);
  cookies = { ...cookies, ...captcha.cookies };
  const captchaText = await detectText(captcha.content);
  const success = await validateCaptcha({cookies, viewState, captchaText});
}

module.exports = validateRfc;
