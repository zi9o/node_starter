// @flow

const {CommonErrors, AppError, MESSAGES} = require('../../common/_errors');
const {ACCESS_DENIED_RESPONSE} = require('../../common/_constants');
const {config} = require('../../config');
const jwt = require('jsonwebtoken');
const {UserModel} = require('../models/user.model');

/**
 * Extract token from header
 * @param authHeader
 * @returns {string}
 */
const getToken = (authHeader: string): string => {
  let token = authHeader.split(' ')[1];
  // A Bearer token has to respect the norm https://tools.ietf.org/html/rfc6750#section-1.2
  if (!token) token = authHeader;
  return token;
};

/**
 * Retrieve the payload from token
 * @param token
 * @param callback
 */
function getPayload(token: string, callback: Function) {
  jwt.verify(token, config.auth.privateKey, (err, payload) => {
    if (err) return callback(err);
    return callback(null, payload);
  });
}

/**
 * Authorization middleware
 */
exports.requireAuthentication = (req: any, res: any, next: Function): Function => {

  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = getToken(authHeader);

    getPayload(token, async (err, payload) => {
      if (err) {
        return next(new AppError(CommonErrors.Unauthorized, MESSAGES.USERS.AUTH.UNAUTHORIZED, true));
      }
      if (payload.id) {
        req.user = await UserModel.getUserDetailById(payload.id);
        if (!req.user) {
          // User already deleted while requiring token
          console.warn('user_delete_not_exists', {id: payload.id});
          return next(new AppError(CommonErrors.Unauthorized, MESSAGES.USERS.AUTH.UNAUTHORIZED, true));
        }
      } else {
        console.error('auth_payload_not_provided', {id: payload.id});
        return next(new AppError(CommonErrors.NotAcceptable, MESSAGES.USERS.AUTH.UNAUTHORIZED, true));
      }

      next();
    });
  } else {
    // No header provided
    console.error('auth_header_not_provided', req.body);
    return res.status(CommonErrors.NotAcceptable).json(ACCESS_DENIED_RESPONSE);
  }
};
