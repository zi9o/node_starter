// @flow
import type {MiddlewareUserDetail} from '../common/_interfaces/user/user-detail.interface';

const {AppError, CommonErrors, MESSAGES} = require('../common/_errors');
const {getErrorMessage} = require('../controllers/errors.controller');
const {AuthService} = require('../services/auth.service');
const {UserModel} = require('../models/user.model');

// -----------------------------------------------------------------------------------------------------
// @ Helpers
// -----------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------
// @ Methods
// -----------------------------------------------------------------------------------------------------

module.exports = {
  /**
   * Return a valid token for a valid username/password
   * @param username
   * @param password
   * @returns {Promise<string>}
   */
  signIn: (username: string, password: string): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      try {
        const userDetail: MiddlewareUserDetail | null = await UserModel.getUserDetailByName(username);
        if (userDetail) {
          // User exists
          const isMatch = await AuthService.comparePasswordHash(password, userDetail.hash || '');
          if (!isMatch) {
            // Incorrect password
            return reject(new AppError(CommonErrors.Forbidden, MESSAGES.USERS.AUTH.LOGIN_FAILED, true));
          }

          // Change the last login date
          await UserModel.connectUserById(userDetail.userId);

          const payload = {id: userDetail.userId};
          resolve(await AuthService.generateToken(payload));
        } else {
          // Username doesn't match any user
          return reject(new AppError(CommonErrors.Forbidden, MESSAGES.USERS.AUTH.LOGIN_FAILED, true));
        }
      } catch (e) {
        reject(new AppError(CommonErrors.InternalServerError, getErrorMessage(e), true));
      }
    });
  },
};
