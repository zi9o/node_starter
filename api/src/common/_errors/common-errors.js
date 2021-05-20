// Please refer to https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
const CommonErrors = {
  InvalidInput: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  Conflict: 409,
  RequestEntityTooLarge: 413,
  MethodFailure: 420,
  InvalidToken: 498,
  TokenRequired: 499,
  InternalServerError: 500,
};

module.exports = {CommonErrors};
