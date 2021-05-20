const {CommonResponses} = require('./common-responses');

module.exports = {
  CommonResponses: CommonResponses,
  ACCESS_DENIED_RESPONSE: {
    success: false,
    message: 'ACCESS_TOKEN_RESET',
  }
};
