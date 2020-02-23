const sinon = require('sinon');
const proxyquire = require('proxyquire');

const detectText = sinon.stub();
const getCaptcha = sinon.stub();
const getSessionData = sinon.stub();
const validateCaptcha = sinon.stub();
const verifyRfc = sinon.stub();

const fetchRfcStatus = proxyquire(`${ROOT_PATH}/lib/use-cases/sat/fetch-rfc-status`, {
  '../../fetchers/google-cloud': { detectText },
  '../../fetchers/sat': {
    getCaptcha,
    getSessionData,
    validateCaptcha,
    verifyRfc
  }
});

const RFC = 'RFC';
const COOKIES = { JSESSION: 'SESSION' };
const VIEW_STATE = 'VIEW_STATE';
const CAPTCHA_CONTENT = 'CAPTCHA_CONTENT';
const CAPTCHA_TEXT = 'CAPTCHA_TEXT';
const RESPONSE = 'RESPONSE';

describe('Use cases | sat | .fetchRfcStatus', () => {
  beforeEach(() => {
    detectText.resetHistory();
    getCaptcha.resetHistory();
    getSessionData.resetHistory();
    validateCaptcha.resetHistory();
    verifyRfc.resetHistory();
  });

  before(() => {
    detectText.resolves(CAPTCHA_TEXT);
    getSessionData.resolves({ cookies: COOKIES, viewState: VIEW_STATE });
    getCaptcha.resolves({ content: CAPTCHA_CONTENT });
    verifyRfc.resolves(RESPONSE);
  });

  describe('Successful execution', () => {
    describe('when captcha is solved on first attempt', () => {
      before(() => validateCaptcha.resolves(true));

      it('should call each method with expected parameters', async () => {
        const response = await fetchRfcStatus(RFC);
        expect(response).to.be.equal(RESPONSE);

        expect(getSessionData.callCount).to.be.equal(1);
        expect(getSessionData.firstCall.args).to.be.eql([]);

        expect(getCaptcha.callCount).to.be.equal(1);
        expect(getCaptcha.firstCall.args).to.be.eql([ COOKIES ]);

        expect(detectText.callCount).to.be.equal(1);
        expect(detectText.firstCall.args).to.be.eql([ CAPTCHA_CONTENT ]);

        expect(validateCaptcha.callCount).to.be.equal(1);
        expect(validateCaptcha.firstCall.args).to.be.eql([ COOKIES, VIEW_STATE, CAPTCHA_TEXT ]);

        expect(verifyRfc.callCount).to.be.equal(1);
        expect(verifyRfc.firstCall.args).to.be.eql([ COOKIES, VIEW_STATE, RFC ]);
      });
    });

    describe('when captcha fails 2 times', () => {
      before(() => {
        validateCaptcha.onCall(0).resolves(false);
        validateCaptcha.onCall(1).resolves(false);
        validateCaptcha.onCall(2).resolves(true);
      });

      it('should call each method with expected parameters', async () => {
        const response = await fetchRfcStatus(RFC);
        expect(response).to.be.equal(RESPONSE);

        expect(getSessionData.callCount).to.be.equal(1);
        expect(getCaptcha.callCount).to.be.equal(3);
        expect(detectText.callCount).to.be.equal(3);
        expect(validateCaptcha.callCount).to.be.equal(3);
        expect(verifyRfc.callCount).to.be.equal(1);
      });
    });
  });

  describe('Failed execution', () => {
    before(() => {
      validateCaptcha.resetBehavior();
      validateCaptcha.resolves(false);
    });

    it('should throw error after 5 attempts to solve the captcha', async () => {
      await expect(fetchRfcStatus(RFC)).to.be.rejectedWith(Error);

      expect(getSessionData.callCount).to.be.equal(1);
      expect(getCaptcha.callCount).to.be.equal(5);
      expect(detectText.callCount).to.be.equal(5);
      expect(validateCaptcha.callCount).to.be.equal(5);
      expect(verifyRfc.callCount).to.be.equal(0);
    });
  });
});
