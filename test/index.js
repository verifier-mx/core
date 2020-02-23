process.env.NODE_ENV = 'test';
require('../config/load');

const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const TestUtils = require('verifier-test-utils');
const {engines} = require('verifier-database');
const ROOT_PATH = path.join(__dirname, '..');

chai.use(chaiAsPromised);

global.testUtils = new TestUtils({engines});
global.expect = chai.expect;
global.ROOT_PATH = ROOT_PATH;

process.on('unhandledRejection', trace => console.log(trace));
